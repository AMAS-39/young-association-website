<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Sidebar and Main Content Container -->
    <div class="flex min-h-screen">
      <!-- Sidebar -->
      <aside class="w-64 bg-white dark:bg-gray-800 shadow-md">
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Admin Dashboard</h2>
          <nav class="space-y-4">
            <button class="w-full text-left px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">Manage Events</button>
            <button @click="logout" class="w-full text-left px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">Logout</button>
          </nav>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-8">
        <div class="max-w-6xl mx-auto">
          <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Manage Events</h1>
            <button @click="openEventForm()" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
              Add New Event
            </button>
          </div>

          <!-- Events List -->
          <div class="space-y-4">
            <div v-for="event in events" :key="event.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center space-x-4">
                    <img :src="event.imageUrl" alt="Event" class="w-20 h-20 object-cover rounded-lg">
                    <div>
                      <div class="mb-4">
                        <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100">{{ event.en.title }}</h3>
                        <p class="text-sm text-gray-500">{{ event.date }}</p>
                      </div>
                      <div class="grid grid-cols-2 gap-6">
                        <!-- English Content -->
                        <div>
                          <h4 class="font-medium text-gray-700 dark:text-gray-300 mb-1">English</h4>
                          <p class="text-gray-600 dark:text-gray-400">{{ event.en.description }}</p>
                        </div>
                        <!-- Kurdish Content -->
                        <div>
                          <h4 class="font-medium text-gray-700 dark:text-gray-300 mb-1">Kurdish</h4>
                          <p class="text-gray-600 dark:text-gray-400 text-right" dir="rtl">{{ event.ku.description }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex space-x-2">
                  <button @click="openEventForm(event)" class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
                    Edit
                  </button>
                  <button @click="deleteEvent(event.id)" class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Event Form Modal -->
          <div v-if="showEventForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div class="p-6">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  {{ isEditingEvent ? 'Edit Event' : 'Add New Event' }}
                </h2>
                <form @submit.prevent="saveEvent" class="space-y-6">
                  <!-- Common Fields -->
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                      <input type="date" v-model="eventForm.date" class="w-full p-2 border rounded-lg" required>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                      <input type="url" v-model="eventForm.imageUrl" class="w-full p-2 border rounded-lg" required>
                    </div>
                  </div>

                  <!-- English Content -->
                  <div class="border-t pt-4">
                    <h3 class="text-lg font-semibold mb-4">English Content</h3>
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                        <input type="text" v-model="eventForm.en.title" class="w-full p-2 border rounded-lg" required>
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                        <textarea v-model="eventForm.en.description" rows="4" class="w-full p-2 border rounded-lg" required></textarea>
                      </div>
                    </div>
                  </div>

                  <!-- Kurdish Content -->
                  <div class="border-t pt-4">
                    <h3 class="text-lg font-semibold mb-4">Kurdish Content</h3>
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                        <input type="text" v-model="eventForm.ku.title" class="w-full p-2 border rounded-lg text-right" dir="rtl" required>
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                        <textarea v-model="eventForm.ku.description" rows="4" class="w-full p-2 border rounded-lg text-right" dir="rtl" required></textarea>
                      </div>
                    </div>
                  </div>

                  <div class="flex justify-end space-x-3 pt-4 border-t">
                    <button type="button" @click="closeForm" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
                      Cancel
                    </button>
                    <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                      {{ isEditingEvent ? 'Update Event' : 'Add Event' }}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminAccess',
  data() {
    return {
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
    }
  },
  created() {
    // Check authentication
    if (!localStorage.getItem('isAuthenticated')) {
      this.$router.push('/login');
      return;
    }
    
    // Load events
    try {
      const savedEvents = localStorage.getItem('events');
      this.events = savedEvents ? JSON.parse(savedEvents) : [];
    } catch (error) {
      console.error('Error loading events:', error);
      this.events = [];
    }
  },
  methods: {
    openEventForm(event = null) {
      this.isEditingEvent = !!event;
      if (event) {
        // Deep copy for editing
        this.eventForm = JSON.parse(JSON.stringify(event));
      } else {
        // Reset form for new event
        this.eventForm = {
          id: Date.now(),
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
        };
      }
      this.showEventForm = true;
    },
    saveEvent() {
      try {
        if (this.isEditingEvent) {
          const index = this.events.findIndex(e => e.id === this.eventForm.id);
          if (index !== -1) {
            this.events.splice(index, 1, JSON.parse(JSON.stringify(this.eventForm)));
          }
        } else {
          this.events.push(JSON.parse(JSON.stringify(this.eventForm)));
        }
        localStorage.setItem('events', JSON.stringify(this.events));
        this.closeForm();
      } catch (error) {
        console.error('Error saving event:', error);
        alert('Error saving event. Please try again.');
      }
    },
    deleteEvent(id) {
      if (confirm('Are you sure you want to delete this event?')) {
        this.events = this.events.filter(event => event.id !== id);
        localStorage.setItem('events', JSON.stringify(this.events));
      }
    },
    closeForm() {
      this.showEventForm = false;
      this.isEditingEvent = false;
    },
    logout() {
      localStorage.removeItem('isAuthenticated');
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.bg-light-background {
  background-color: #f7fafc;
}
.bg-dark-background {
  background-color: #1a202c;
}
</style>
