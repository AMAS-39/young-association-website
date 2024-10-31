<template>
  <div class="event-card bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl">
    <img v-if="event.imageUrl" :src="event.imageUrl" alt="Event Image" class="w-full h-48 object-cover rounded-t-lg mb-4" />
    <h3 class="text-2xl font-bold text-gray-800 dark:text-gray-100">{{ event.title }}</h3>
    <p class="text-gray-600 dark:text-gray-400">{{ event.date }}</p>
    <p class="mt-2 text-gray-700 dark:text-gray-300">{{ event.description }}</p>
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
};
</script>

<style scoped>
.event-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
</style>
