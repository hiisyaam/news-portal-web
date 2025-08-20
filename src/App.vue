<template>
  <div class="bg-white font-sohne">
    <nav class="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">

          <div class="flex items-center">
            <div>
              <h1 class="text-2xl font-bold text-medium-green leading-tight">AI News</h1>
              <p class="text-sm text-medium-gray">Display the latest AI news</p>
            </div>
          </div>

          <div class="flex-1 w-full ml-4 md:ml-8 md:max-w-lg">
            <form @submit.prevent="performSearch" class="w-full">
              <div class="relative">
                <input type="search" v-model="searchQuery" placeholder="Search by Keyword"
                  class="block w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-medium-green focus:border-transparent">
              </div>
            </form>
          </div>

        </div>
      </div>
    </nav>

    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="isLoading && articles.length === 0" class="text-center py-20">
        <p class="text-lg text-medium-gray">Loading news...</p>
      </div>

      <div v-else class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <NewsCard v-for="article in articles" :key="article.url" :article="article" />
      </div>

      <div v-if="!isLoading && articles.length === 0" class="text-center py-20">
        <p class="text-center text-medium-gray">No articles found for "{{ currentQuery }}".</p>
      </div>

      <div v-if="articles.length > 0" class="text-center mt-12">
        <button @click="loadMore" :disabled="isLoadingMore"
          class="bg-medium-green text-white font-bold py-2 px-6 rounded-full hover:bg-green-800 transition duration-300 disabled:bg-gray-400">
          {{ isLoadingMore ? 'Loading...' : 'Load More' }}
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import NewsCard from './components/NewsCard.vue'
import { newsService } from './services/newsService.js'

export default {
  name: 'App',
  components: {
    NewsCard
  },
  data() {
    return {
      articles: [],
      searchQuery: '',
      currentQuery: 'AI',
      page: 1,
      isLoading: false,
      isLoadingMore: false,
      nextPageTokens: {
        newsdata: null
      }
    }
  },
  async mounted() {
    await this.fetchNews()
  },
  methods: {
    async handleSearch() {
      if (this.searchQuery.trim()) {
        this.currentQuery = this.searchQuery.trim()
        this.page = 1
        this.nextPageTokens.newsdata = null
        this.articles = []
        await this.fetchNews()
      }
    },

    async fetchNews() {
      if (this.isLoading) return

      this.isLoading = true

      try {
        const newArticles = await newsService.fetchNews(
          this.currentQuery,
          this.page,
          this.nextPageTokens
        )
        
        this.nextPageTokens = newArticles.nextPageTokens

        if (this.page === 1) {
          this.articles = newArticles.articles
        } else {
          this.articles.push(...newArticles.articles)
        }
      } catch (error) {
        console.error('Error fetching news:', error)
      } finally {
        this.isLoading = false
      }
    },

    async loadMore() {
      if (this.isLoadingMore) return

      this.isLoadingMore = true
      this.page++

      try {
        const newArticles = await newsService.fetchNews(
          this.currentQuery,
          this.page,
          this.nextPageTokens
        )

        this.nextPageTokens = newArticles.nextPageTokens
        this.articles.push(...newArticles.articles)
      } catch (error) {
        console.error('Error loading more news:', error)
      } finally {
        this.isLoadingMore = false
      }
    }
  }
}
</script>
