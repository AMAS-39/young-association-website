<template>
  <div>
    <!-- Event Card -->
    <div class="event-card bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <img v-if="event.imageUrl" :src="event.imageUrl" alt="Event Image" class="w-full h-48 object-cover rounded-t-lg mb-4" />
      <h3 class="text-2xl font-bold text-gray-800 dark:text-gray-100">{{ event.title }}</h3>
      <p class="text-gray-600 dark:text-gray-400">{{ event.date }}</p>
      
      <!-- Description with Read More -->
      <div class="mt-2">
        <p class="text-gray-700 dark:text-gray-300">
          {{ truncatedDescription }}
          <button 
            v-if="isLongDescription" 
            @click="showModal = true"
            class="text-blue-600 dark:text-blue-400 hover:underline ml-2"
          >
            Read More
          </button>
        </p>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Dark overlay -->
      <div 
        class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        @click="showModal = false"
      ></div>
      
      <!-- Modal content -->
      <div class="flex items-center justify-center min-h-screen p-4">
        <div class="relative bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6 shadow-xl">
          <button 
            @click="showModal = false"
            class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <h3 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">{{ event.title }}</h3>
          <p class="text-gray-700 dark:text-gray-300">{{ event.description }}</p>
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
      maxLength: 150, // Maximum number of characters to show before truncating
    };
  },
  computed: {
    isLongDescription() {
      return this.event.description.length > this.maxLength;
    },
    truncatedDescription() {
      if (this.isLongDescription) {
        return this.event.description.slice(0, this.maxLength) + '...';
      }
      return this.event.description;
    },
  },
};
</script>

<style scoped>
.event-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
</style>
