<template>
  <div class="bg-light-background min-h-screen p-8">
    <h1 class="text-3xl font-bold mb-6">Admin Dashboard</h1>
    
    <!-- Sidebar Buttons -->
    <div class="mb-6">
      <button @click="logout" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Logout</button>
    </div>

    <!-- Events List -->
    <div>
      <button class="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" @click="openEventForm()">Add New Event</button>
      <div v-if="events.length === 0" class="text-gray-600">
        No events yet. Click "Add New Event" to create one.
      </div>
      <div v-else class="space-y-4">
        <div v-for="event in events" :key="event.id" class="p-4 bg-white shadow rounded-lg">
          <h3 class="text-xl font-bold">{{ event.en.title }}</h3>
          <p>{{ event.date }}</p>
        </div>
      </div>
    </div>

    <!-- Simple Form Modal -->
    <div v-if="showEventForm" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-2xl font-bold mb-4">Add Event</h2>
        <form @submit.prevent="saveEvent">
          <input 
            type="text" 
            v-model="eventForm.en.title" 
            class="w-full p-3 border rounded-lg mb-4" 
            placeholder="Event Title"
            required 
          />
          <div class="flex justify-end gap-2">
            <button type="button" @click="closeForm('event')" class="px-4 py-2 bg-gray-500 text-white rounded-lg">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminAccess',
  created() {
    if (!localStorage.getItem("isAuthenticated")) {
      this.$router.push("/login");
    }
    console.log('Admin page created'); // Debug log
  },
  data() {
    return {
      events: JSON.parse(localStorage.getItem('events')) || [],
      showEventForm: false,
      eventForm: {
        id: null,
        date: new Date().toISOString().split('T')[0],
        en: { title: '', description: '' },
        ku: { title: '', description: '' }
      }
    };
  },
  methods: {
    openEventForm() {
      this.showEventForm = true;
    },
    saveEvent() {
      const eventData = {
        ...this.eventForm,
        id: Date.now()
      };
      this.events.push(eventData);
      localStorage.setItem('events', JSON.stringify(this.events));
      this.closeForm('event');
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
