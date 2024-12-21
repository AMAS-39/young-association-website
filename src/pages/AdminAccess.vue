<template>
  <div class="bg-light-background dark:bg-dark-background min-h-screen flex">
    <!-- Sidebar for Admin Navigation -->
    <aside class="w-1/4 bg-gray-100 dark:bg-gray-800 p-6">
      <h2 class="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">Admin Dashboard</h2>
      <nav class="space-y-4">
        <button class="block w-full text-left px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">Manage Events</button>
        <button @click="logout" class="block w-full text-left px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600">Logout</button>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 p-8">
      <h1 class="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Manage Events</h1>

      <!-- Events List -->
      <div>
        <button class="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" @click="openEventForm()">Add New Event</button>
        <div class="space-y-4">
          <div v-for="event in events" :key="event.id" class="p-4 bg-white dark:bg-gray-700 shadow rounded-lg flex justify-between items-center">
            <div>
              <img :src="event.imageUrl" alt="Event Image" class="w-16 h-16 object-cover rounded-lg mb-2">
              <h3 class="text-xl font-bold">{{ event.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300">{{ event.date }}</p>
              <p class="text-gray-700 dark:text-gray-200">{{ event.description }}</p>
            </div>
            <div class="space-x-2">
              <button class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600" @click="openEventForm(event)">Edit</button>
              <button class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600" @click="deleteEvent(event.id)">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Event Form Modal -->
      <div v-if="showEventForm" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">{{ isEditingEvent ? 'Edit Event' : 'Add New Event' }}</h2>
          <form @submit.prevent="saveEvent">
            <div class="mb-4">
              <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Title</label>
              <input type="text" v-model="eventForm.title" class="w-full p-3 border rounded-lg" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Date</label>
              <input type="date" v-model="eventForm.date" class="w-full p-3 border rounded-lg" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Description</label>
              <textarea v-model="eventForm.description" rows="3" class="w-full p-3 border rounded-lg" required></textarea>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Image URL</label>
              <input type="url" v-model="eventForm.imageUrl" class="w-full p-3 border rounded-lg" placeholder="Image URL" required />
            </div>
            <div class="flex justify-end space-x-4">
              <button type="button" @click="closeForm" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Cancel</button>
              <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {{ isEditingEvent ? 'Update Event' : 'Add Event' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'AdminAccess',
  created() {
    if (!localStorage.getItem("isAuthenticated")) {
      this.$router.push("/login");
    }
  },
  data() {
    return {
      events: JSON.parse(localStorage.getItem('events')) || [],
      showEventForm: false,
      isEditingEvent: false,
      eventForm: {
        id: null,
        title: '',
        date: '',
        description: '',
        imageUrl: ''
      }
    };
  },
  methods: {
    openEventForm(event = null) {
      this.isEditingEvent = !!event;
      this.eventForm = event ? { ...event } : {
        id: Date.now(),
        title: '',
        date: '',
        description: '',
        imageUrl: ''
      };
      this.showEventForm = true;
    },
    saveEvent() {
      if (this.isEditingEvent) {
        const index = this.events.findIndex(event => event.id === this.eventForm.id);
        if (index !== -1) {
          this.events.splice(index, 1, { ...this.eventForm });
        }
      } else {
        this.events.push({ ...this.eventForm });
      }
      localStorage.setItem('events', JSON.stringify(this.events));
      this.closeForm();
    },
    deleteEvent(id) {
      this.events = this.events.filter(event => event.id !== id);
      localStorage.setItem('events', JSON.stringify(this.events));
    },
    closeForm() {
      this.showEventForm = false;
    },
    logout() {
      localStorage.removeItem('isAuthenticated');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.bg-light-background {
  background-color: #f7fafc;
}
.bg-dark-background {
  background-color: #1a202c;
}
</style>
