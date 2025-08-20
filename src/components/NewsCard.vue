<template>
    <div class="flex flex-col border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <a :href="article.url" target="_blank" rel="noopener noreferrer" class="block">
        <img 
          v-if="article.imageUrl" 
          :src="article.imageUrl" 
          :alt="article.title" 
          class="w-full h-48 object-cover"
          @error="handleImageError"
        >
        <div v-else class="w-full h-48 bg-gray-200"></div>
      </a>
      <div class="p-4 flex flex-col flex-grow">
        <p class="text-sm text-medium-gray mb-1">{{ article.source }}</p>
        <a :href="article.url" target="_blank" rel="noopener noreferrer" class="hover:underline">
          <h3 class="text-lg font-bold text-medium-dark mb-2 leading-tight">{{ article.title }}</h3>
        </a>
        <p class="text-gray-600 text-sm flex-grow mb-4">{{ truncatedDescription }}</p>
        <div class="text-xs text-medium-gray mt-auto">
          <span>{{ formattedTime }}</span> &middot;
          <span>{{ readTime }} min read</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NewsCard',
    props: {
      article: {
        type: Object,
        required: true
      }
    },
    computed: {
      truncatedDescription() {
        if (!this.article.description) return ''
        if (this.article.description.length <= 100) return this.article.description
        return this.article.description.substr(0, this.article.description.lastIndexOf(' ', 100)) + '...'
      },
      
      formattedTime() {
        if (!this.article.publishedAt) return ''
        const date = new Date(this.article.publishedAt)
        const now = new Date()
        const diffInSeconds = Math.floor((now - date) / 1000)
  
        if (diffInSeconds < 60) {
          return `${diffInSeconds}s ago`
        }
        const diffInMinutes = Math.floor(diffInSeconds / 60)
        if (diffInMinutes < 60) {
          return `${diffInMinutes}m ago`
        }
        const diffInHours = Math.floor(diffInMinutes / 60)
        if (diffInHours < 24) {
          return `${diffInHours}h ago`
        } else if (diffInHours < 168) {
          return `${Math.floor(diffInHours / 24)}d ago`
        } else {
          return date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
        }
      },
      
      readTime() {
        if (!this.article.description) return 3
        const wordsPerMinute = 200
        const words = this.article.description.split(' ').length
        return Math.max(1, Math.ceil(words / wordsPerMinute))
      }
    },
    methods: {
      handleImageError(event) {
        event.target.parentElement.innerHTML = '<div class="w-full h-48 bg-gray-200"></div>'
      }
    }
  }
  </script>