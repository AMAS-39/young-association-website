//EventCard.vue
<template>
  <div class="event-card bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
    <!-- Card Content -->
    <div class="relative">
      <!-- Image with Fallback -->
      <div class="relative h-48 overflow-hidden group">
        <img 
          :src="event.imageUrl" 
          :alt="getTitle"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          @error="handleImageError" 
        />
        <!-- Date Badge -->
        <div class="absolute top-2 right-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm shadow-lg backdrop-blur-sm bg-opacity-90">
          {{ formattedDate }}
        </div>
      </div>

      <!-- Content -->
      <div class="p-6">
        <!-- Title -->
        <h3 
          class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
              class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline inline-flex items-center gap-2 mt-3 transition-colors"
              :class="{ 'flex-row-reverse': isKurdish }"
            >
              {{ isKurdish ? 'زیاتر بخوێنەوە' : 'Read More' }}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-4 w-4" 
                :class="{ 'rotate-180': isKurdish }"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </p>
        </div>
      </div>
    </div>

    <!-- Improved Modal -->
    <div 
      v-if="showModal" 
      class="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
      @click.self="closeModal"
    >
      <div class="flex items-center justify-center min-h-screen px-4 py-8">
        <div 
          class="relative bg-white dark:bg-gray-800 w-full max-w-3xl rounded-xl shadow-2xl transform transition-all"
          :class="modalOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
        >
          <!-- Close Button -->
          <button 
            @click="closeModal"
            class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Modal Content -->
          <div class="p-6">
            <div class="relative h-72 mb-6 rounded-lg overflow-hidden">
              <img 
                :src="event.imageUrl" 
                :alt="getTitle"
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
              <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black to-transparent p-4">
                <p class="text-white text-sm">{{ formattedDate }}</p>
              </div>
            </div>
            
            <h3 
              class="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4"
              :class="{ 'text-right': isKurdish }"
              :dir="textDirection"
            >
              {{ getTitle }}
            </h3>

            <div 
              class="prose dark:prose-invert max-w-none"
              :class="{ 'text-right': isKurdish }"
              :dir="textDirection"
            >
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                {{ getDescription }}
              </p>
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
      modalOpen: false,
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
    },
    closeModal() {
      this.modalOpen = false;
      setTimeout(() => {
        this.showModal = false;
      }, 200);
    }
  },
  watch: {
    showModal(newValue) {
      if (newValue) {
        setTimeout(() => {
          this.modalOpen = true;
        }, 50);
      }
    }
  }
};
</script>

<style scoped>
.event-card {
  transition: all 0.3s ease;
}

.event-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Smooth modal transition */
.transform {
  transition-property: transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Improved typography */
.prose {
  font-size: 1.125rem;
  line-height: 1.75;
}

/* Modal backdrop animation */
.backdrop-blur-sm {
  transition: backdrop-filter 0.3s ease;
}
</style>
