<template>
  <div class="min-h-screen bg-light-background dark:bg-dark-background">
    <!-- Debug Info -->
    <div class="p-4 bg-yellow-200" v-if="debug">
      <p>Debug Info:</p>
      <p>Auth Status: {{ isAuthenticated ? 'Authenticated' : 'Not Authenticated' }}</p>
      <p>Events Count: {{ events.length }}</p>
    </div>

    <MainHeader />
    
    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-gray-100 dark:bg-gray-800 min-h-screen p-6">
        <h2 class="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">Admin Dashboard</h2>
        <nav class="space-y-4">
          <button class="block w-full text-left px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
            Manage Events
          </button>
          <button @click="logout" class="block w-full text-left px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600">
            Logout
          </button>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-8">
        <h1 class="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Manage Events</h1>

        <!-- Events List -->
        <div>
          <button @click="openEventForm" class="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Add New Event
          </button>

          <div v-if="events.length === 0" class="text-gray-600 dark:text-gray-400 text-center py-8">
            No events yet. Click "Add New Event" to create one.
          </div>

          <div class="space-y-4">
            <div v-for="event in events" :key="event.id" class="p-4 bg-white dark:bg-gray-700 shadow rounded-lg">
              <div class="grid grid-cols-2 gap-4">
                <!-- English Content -->
                <div>
                  <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">English</h4>
                  <h3 class="text-xl font-bold">{{ event.en.title }}</h3>
                  <p class="text-gray-700 dark:text-gray-200">{{ event.en.description }}</p>
                </div>
                <!-- Kurdish Content -->
                <div>
                  <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">Kurdish</h4>
                  <h3 class="text-xl font-bold">{{ event.ku.title }}</h3>
                  <p class="text-gray-700 dark:text-gray-200">{{ event.ku.description }}</p>
                </div>
              </div>
              <div class="mt-4 flex justify-end space-x-2">
                <button @click="openEventForm(event)" class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                  Edit
                </button>
                <button @click="deleteEvent(event.id)" class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Event Form Modal -->
        <div v-if="showEventForm" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl w-full m-4">
            <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              {{ isEditingEvent ? 'Edit Event' : 'Add New Event' }}
            </h2>
            <form @submit.prevent="saveEvent" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Date</label>
                  <input type="date" v-model="eventForm.date" class="w-full p-3 border rounded-lg" required />
                </div>
                <div>
                  <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Image URL</label>
                  <input type="url" v-model="eventForm.imageUrl" class="w-full p-3 border rounded-lg" placeholder="Image URL" required />
                </div>
              </div>

              <!-- English Content -->
              <div class="border-t pt-4">
                <h3 class="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">English Content</h3>
                <div>
                  <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Title</label>
                  <input type="text" v-model="eventForm.en.title" class="w-full p-3 border rounded-lg" required />
                </div>
                <div class="mt-4">
                  <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Description</label>
                  <textarea v-model="eventForm.en.description" rows="3" class="w-full p-3 border rounded-lg" required></textarea>
                </div>
              </div>

              <!-- Kurdish Content -->
              <div class="border-t pt-4">
                <h3 class="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Kurdish Content</h3>
                <div>
                  <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Title</label>
                  <input type="text" v-model="eventForm.ku.title" class="w-full p-3 border rounded-lg" required dir="rtl" />
                </div>
                <div class="mt-4">
                  <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Description</label>
                  <textarea v-model="eventForm.ku.description" rows="3" class="w-full p-3 border rounded-lg" required dir="rtl"></textarea>
                </div>
              </div>

              <div class="flex justify-end space-x-4 pt-4">
                <button type="button" @click="closeForm" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                  Cancel
                </button>
                <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  {{ isEditingEvent ? 'Update Event' : 'Add Event' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue';

export default {
  name: 'AdminAccess',
  components: {
    MainHeader
  },
  data() {
    return {
      debug: true, // Enable debugging
      isAuthenticated: false,
      events: [],
      showEventForm: false,
      isEditingEvent: false,
      eventForm: {
        id: null,
        date: '',
        imageUrl: '',
        en: {
          title: '',
          description: ''
        },
        ku: {
          title: '',
          description: ''
        }
      }
    };
  },
  created() {
    console.log('AdminAccess component created');
    this.checkAuthentication();
    this.loadEvents();
  },
  methods: {
    checkAuthentication() {
      console.log('Checking authentication...');
      this.isAuthenticated = !!localStorage.getItem('isAuthenticated');
      console.log('Authentication status:', this.isAuthenticated);
      
      if (!this.isAuthenticated) {
        console.log('Not authenticated, redirecting to login...');
        this.$router.push('/login');
        return false;
      }
      return true;
    },
    loadEvents() {
      try {
        const storedEvents = localStorage.getItem('events');
        console.log('Loading events from storage:', storedEvents);
        this.events = storedEvents ? JSON.parse(storedEvents) : [];
      } catch (error) {
        console.error('Error loading events:', error);
        this.events = [];
      }
    },
    openEventForm(event = null) {
      console.log('Opening event form with event:', event);
      this.isEditingEvent = !!event;
      if (event) {
        this.eventForm = { ...event };
      } else {
        this.eventForm = {
          id: Date.now(),
          date: '',
          imageUrl: '',
          en: { title: '', description: '' },
          ku: { title: '', description: '' }
        };
      }
      this.showEventForm = true;
    },
    saveEvent() {
      console.log('Saving event:', this.eventForm);
      if (this.isEditingEvent) {
        const index = this.events.findIndex(e => e.id === this.eventForm.id);
        if (index !== -1) {
          this.events[index] = { ...this.eventForm };
        }
      } else {
        this.events.push({ ...this.eventForm });
      }
      localStorage.setItem('events', JSON.stringify(this.events));
      this.closeForm();
    },
    deleteEvent(id) {
      console.log('Deleting event:', id);
      this.events = this.events.filter(event => event.id !== id);
      localStorage.setItem('events', JSON.stringify(this.events));
    },
    closeForm() {
      console.log('Closing form');
      this.showEventForm = false;
    },
    logout() {
      console.log('Logging out...');
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
