<template>
  <div>
    <!-- Event Card -->
    <div class="event-card bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <!-- Image Container -->
      <div class="relative h-48">
        <img 
          :src="event.imageUrl" 
          alt="Event Image" 
          class="w-full h-full object-cover"
          @error="handleImageError" 
        />
        <div class="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 m-2 rounded-full text-sm">
          {{ formatDate(event.date) }}
        </div>
      </div>

      <!-- Content Container -->
      <div class="p-6">
        <!-- Title -->
        <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2" :dir="currentLanguage === 'ku' ? 'rtl' : 'ltr'">
          {{ currentLanguage === 'en' ? event.en.title : event.ku.title }}
        </h3>

        <!-- Description -->
        <div :dir="currentLanguage === 'ku' ? 'rtl' : 'ltr'">
          <p class="text-gray-600 dark:text-gray-400" :class="{'text-right': currentLanguage === 'ku'}">
            {{ truncatedDescription }}
            <button 
              v-if="isLongDescription" 
              @click="showModal = true"
              class="text-blue-600 dark:text-blue-400 hover:underline ml-2 font-medium"
            >
              {{ currentLanguage === 'en' ? 'Read More' : 'زیاتر بخوێنەوە' }}
            </button>
          </p>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Overlay -->
      <div 
        class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        @click="showModal = false"
      ></div>
      
      <!-- Modal Content -->
      <div class="flex items-center justify-center min-h-screen p-4">
        <div class="relative bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full p-6 shadow-xl">
          <!-- Close Button -->
          <button 
            @click="showModal = false"
            class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Modal Content -->
          <div class="mt-2">
            <!-- Image -->
            <img 
              :src="event.imageUrl" 
              alt="Event Image" 
              class="w-full h-64 object-cover rounded-lg mb-4"
              @error="handleImageError"
            />

            <!-- Title -->
            <h3 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2" :dir="currentLanguage === 'ku' ? 'rtl' : 'ltr'">
              {{ currentLanguage === 'en' ? event.en.title : event.ku.title }}
            </h3>

            <!-- Date -->
            <p class="text-gray-500 dark:text-gray-400 mb-4">{{ formatDate(event.date) }}</p>

            <!-- Description -->
            <div class="prose dark:prose-invert max-w-none" :dir="currentLanguage === 'ku' ? 'rtl' : 'ltr'">
              <p class="text-gray-700 dark:text-gray-300" :class="{'text-right': currentLanguage === 'ku'}">
                {{ currentLanguage === 'en' ? event.en.description : event.ku.description }}
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
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
      maxLength: 150,
      fallbackImage: '/placeholder-image.jpg' // Add a placeholder image path
    };
  },
  computed: {
    currentLanguage() {
      return this.$i18n.locale || 'en';
    },
    isLongDescription() {
      const description = this.currentLanguage === 'en' 
        ? this.event.en.description 
        : this.event.ku.description;
      return description.length > this.maxLength;
    },
    truncatedDescription() {
      const description = this.currentLanguage === 'en'
        ? this.event.en.description
        : this.event.ku.description;

      if (this.isLongDescription) {
        return description.slice(0, this.maxLength) + '...';
      }
      return description;
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString(
        this.currentLanguage === 'en' ? 'en-US' : 'ku', 
        { year: 'numeric', month: 'long', day: 'numeric' }
      );
    },
    handleImageError(e) {
      e.target.src = this.fallbackImage;
    }
  }
};
</script>

<style scoped>
.event-card {
  transition: all 0.3s ease;
}

.event-card:hover {
  transform: translateY(-5px);
}

/* Add smooth transition for modal */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
</style>
