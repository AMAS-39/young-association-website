<template>
  <div>
    <!-- Event Card -->
    <div class="event-card bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      <!-- Image Container -->
      <div class="relative h-48">
        <img 
          :src="event.imageUrl" 
          alt="Event Image" 
          class="w-full h-full object-cover"
          @error="handleImageError" 
        />
        <div class="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-2 rounded-full text-sm">
          {{ formatDate(event.date) }}
        </div>
      </div>

      <!-- Content Container -->
      <div class="p-6">
        <!-- Title -->
        <h3 
          class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2" 
          :dir="currentLanguage === 'ku' ? 'rtl' : 'ltr'"
          :class="{'text-right': currentLanguage === 'ku'}"
        >
          {{ currentContent.title }}
        </h3>

        <!-- Description -->
        <div :dir="currentLanguage === 'ku' ? 'rtl' : 'ltr'">
          <p 
            class="text-gray-600 dark:text-gray-400" 
            :class="{'text-right': currentLanguage === 'ku'}"
          >
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
      <div 
        class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        @click="showModal = false"
      ></div>
      
      <div class="flex items-center justify-center min-h-screen p-4">
        <div class="relative bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full p-6 shadow-xl">
          <button 
            @click="showModal = false"
            class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="mt-2">
            <img 
              :src="event.imageUrl" 
              alt="Event Image" 
              class="w-full h-64 object-cover rounded-lg mb-4"
              @error="handleImageError"
            />

            <h3 
              class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2" 
              :dir="currentLanguage === 'ku' ? 'rtl' : 'ltr'"
              :class="{'text-right': currentLanguage === 'ku'}"
            >
              {{ currentContent.title }}
            </h3>

            <p class="text-gray-500 dark:text-gray-400 mb-4">{{ formatDate(event.date) }}</p>

            <div 
              class="prose dark:prose-invert max-w-none" 
              :dir="currentLanguage === 'ku' ? 'rtl' : 'ltr'"
            >
              <p 
                class="text-gray-700 dark:text-gray-300" 
                :class="{'text-right': currentLanguage === 'ku'}"
              >
                {{ currentContent.description }}
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
      validator: (value) => {
        return value && value.en && value.ku && value.date && value.imageUrl;
      }
    },
  },
  data() {
    return {
      showModal: false,
      maxLength: 150,
      fallbackImage: '/placeholder-event.jpg'
    };
  },
  computed: {
    currentLanguage() {
      return this.$i18n.locale || localStorage.getItem('language') || 'en';
    },
    currentContent() {
      return this.currentLanguage === 'en' ? this.event.en : this.event.ku;
    },
    isLongDescription() {
      return this.currentContent.description.length > this.maxLength;
    },
    truncatedDescription() {
      if (this.isLongDescription) {
        return this.currentContent.description.slice(0, this.maxLength) + '...';
      }
      return this.currentContent.description;
    }
  },
  methods: {
    formatDate(date) {
      try {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(
          this.currentLanguage === 'en' ? 'en-US' : 'ar-IQ', 
          options
        );
      } catch (error) {
        return date;
      }
    },
    handleImageError(e) {
      e.target.src = this.fallbackImage;
    }
  }
};
</script>

<style scoped>
.event-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
</style>
