import axios from 'axios'

class NewsService {
  constructor() {
    this.apiKeys = {
      newsApi: import.meta.env.VITE_NEWS_API_KEY,
      guardian: import.meta.env.VITE_GUARDIAN_API_KEY,
      newsData: import.meta.env.VITE_NEWSDATA_API_KEY
    }
  }

  async fetchNews(query, page, nextPageTokens) {
    try {
      const promises = [
        this.fetchNewsApi(query, page),
        this.fetchGuardianApi(query, page),
        this.fetchNewsDataApi(query, nextPageTokens.newsdata)
      ]

      const results = await Promise.allSettled(promises)
      let allArticles = []
      let newNextPageTokens = { newsdata: nextPageTokens.newsdata }

      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          if (index === 2) {
            allArticles.push(...result.value.articles)
            newNextPageTokens.newsdata = result.value.nextPageToken
          } else {
            allArticles.push(...result.value)
          }
        } else {
          console.error(`API ${index + 1} failed:`, result.reason)
        }
      })

      const uniqueArticles = this.removeDuplicates(allArticles)
      const sortedArticles = uniqueArticles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

      return {
        articles: sortedArticles,
        nextPageTokens: newNextPageTokens
      }
    } catch (error) {
      console.error('Error fetching news:', error)
      throw error
    }
  }

  async fetchNewsApi(query, page) {
    try {
      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: `"${query}"`,
          apiKey: this.apiKeys.newsApi,
          page: page,
          pageSize: 10,
          sortBy: 'relevancy',
          searchIn: 'title,description',
          language: 'en'
        }
      })

      return (response.data.articles || []).map(article => ({
        title: article.title,
        url: article.url,
        source: article.source?.name || 'Unknown Source',
        publishedAt: article.publishedAt,
        imageUrl: article.urlToImage,
        description: article.description
      }))
    } catch (error) {
      console.error('NewsAPI error:', error)
      return []
    }
  }

  async fetchGuardianApi(query, page) {
    try {
      const response = await axios.get('https://content.guardianapis.com/search', {
        params: {
          q: `"${query}"`,
          'api-key': this.apiKeys.guardian,
          page: page,
          'page-size': 10,
          'show-fields': 'thumbnail,bodyText',
          'order-by': 'relevance'
        }
      })

      return (response.data.response?.results || []).map(article => ({
        title: article.webTitle,
        url: article.webUrl,
        source: 'The Guardian',
        publishedAt: article.webPublicationDate,
        imageUrl: article.fields?.thumbnail,
        description: this.truncateText(article.fields?.bodyText, 150)
      }))
    } catch (error) {
      console.error('Guardian API error:', error)
      return []
    }
  }

  async fetchNewsDataApi(query, nextPageToken) {
    try {
      const params = {
        apikey: this.apiKeys.newsData,
        qInTitle: `"${query}"`,
        language: 'en'
      }

      if (nextPageToken) {
        params.page = nextPageToken
      }

      const response = await axios.get('https://newsdata.io/api/1/latest', { params })

      const articles = (response.data.results || []).map(article => ({
        title: article.title,
        url: article.link,
        source: article.source_id || 'NewsData.io',
        publishedAt: article.pubDate,
        imageUrl: article.image_url,
        description: article.description
      }))

      return {
        articles,
        nextPageToken: response.data.nextPage || null
      }
    } catch (error) {
      console.error('NewsData API error:', error)
      return { articles: [], nextPageToken: null }
    }
  }

  truncateText(text, maxLength) {
    if (!text) return ''
    if (text.length <= maxLength) return text
    return text.substr(0, text.lastIndexOf(' ', maxLength)) + '...'
  }

  removeDuplicates(articles) {
    const seen = new Set()
    return articles.filter(article => {
      if (!article.url || seen.has(article.url)) {
        return false
      }
      seen.add(article.url)
      return true
    })
  }
}

export const newsService = new NewsService()