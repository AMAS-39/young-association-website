<template>
    <div class="event-card bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      <!-- Card Content -->
      <div class="relative">
        <!-- Image with Fallback -->
        <div class="relative h-48">
          <img 
            :src="event.imageUrl" 
            :alt="getTitle"
            class="w-full h-full object-cover"
            @error="handleImageError" 
          />
          <!-- Date Badge -->
          <div class="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
            {{ formattedDate }}
          </div>
        </div>
  
        <!-- Content -->
        <div class="p-6">
          <!-- Title -->
          <h3 
            class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3"
            :class="{ 'text-right': isKurdish }"
            :dir="textDirection"
          >
            {{ getTitle }}
          </h3>
  
          <!-- Description -->
          <div :dir="textDirection">
            <p 
              class="text-gray-600 dark:text-gray-400"
              :class="{ 'text-right': isKurdish }"
            >
              {{ truncatedDescription }}
              <button 
                v-if="isLongDescription"
                @click="showModal = true"
                class="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 mt-2"
                :class="{ 'flex-row-reverse': isKurdish }"
              >
                {{ isKurdish ? 'زیاتر بخوێنەوە' : 'Read More' }}
              </button>
            </p>
          </div>
        </div>
      </div>
  
      <!-- Modal -->
      <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto" @click.self="showModal = false">
        <div class="flex items-center justify-center min-h-screen px-4">
          <div class="relative bg-white dark:bg-gray-800 w-full max-w-2xl rounded-lg shadow-xl">
            <!-- Close Button -->
            <button 
              @click="showModal = false"
              class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
  
            <!-- Modal Content -->
            <div class="p-6">
              <img 
                :src="event.imageUrl" 
                :alt="getTitle"
                class="w-full h-64 object-cover rounded-lg mb-4"
                @error="handleImageError"
              />
              <h3 
                class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2"
                :class="{ 'text-right': isKurdish }"
                :dir="textDirection"
              >
                {{ getTitle }}
              </h3>
              <p class="text-gray-500 mb-4">{{ formattedDate }}</p>
              <div 
                class="prose dark:prose-invert max-w-none"
                :class="{ 'text-right': isKurdish }"
                :dir="textDirection"
              >
                {{ getDescription }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EventCard',
    props: {
      event: {
        type: Object,
        required: true
      },
      currentLanguage: {
        type: String,
        default: 'en'
      }
    },
    data() {
      return {
        showModal: false,
        maxLength: 150,
        fallbackImage: '/placeholder-image.jpg'
      };
    },
    computed: {
      isKurdish() {
        return this.currentLanguage === 'ku';
      },
      textDirection() {
        return this.isKurdish ? 'rtl' : 'ltr';
      },
      getTitle() {
        return this.isKurdish ? this.event.ku.title : this.event.en.title;
      },
      getDescription() {
        return this.isKurdish ? this.event.ku.description : this.event.en.description;
      },
      truncatedDescription() {
        const description = this.getDescription;
        return description.length > this.maxLength 
          ? description.slice(0, this.maxLength) + '...'
          : description;
      },
      isLongDescription() {
        return this.getDescription.length > this.maxLength;
      },
      formattedDate() {
        try {
          const date = new Date(this.event.date);
          return date.toLocaleDateString(this.isKurdish ? 'ku' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
        } catch (error) {
          console.error('Date formatting error:', error);
          return this.event.date;
        }
      }
    },
    methods: {
      handleImageError(e) {
        e.target.src = this.fallbackImage;
        console.log('Image load error, using fallback');
      }
    }
  };
  </script>
  
  <style scoped>
  .event-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .event-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  </style>