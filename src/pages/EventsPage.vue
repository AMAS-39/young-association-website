<template>
  <div class="bg-light-background dark:bg-dark-background min-h-screen">
    <Header />
   
    <!-- Debug Info (remove in production) -->
    <div class="p-4 bg-yellow-100 text-yellow-800">
      Events Count: {{ pastEvents.length }}
      <br>
      Storage Status: {{ hasLocalStorage ? 'Available' : 'Not Available' }}
    </div>

    <!-- Past Events Section -->
    <section class="p-6 max-w-6xl mx-auto mt-12">
      <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
        {{ $t('eventsPage.pastTitle') }}
      </h2>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-8">
        <p>Loading events...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center text-red-600 py-8">
        {{ error }}
      </div>

      <!-- No Events State -->
      <div v-else-if="pastEvents.length === 0" class="text-center text-gray-600 dark:text-gray-400 py-8">
        {{ $t('eventsPage.noEvents') }}
      </div>

      <!-- Events Grid -->
      <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <EventCard 
          v-for="event in pastEvents" 
          :key="event.id" 
          :event="event" 
        />
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/MainHeader.vue';
import Footer from '@/components/MainFooter.vue';
import EventCard from '@/components/EventCard.vue';

export default {
  name: 'EventsPage',
  components: {
    Header,
    Footer,
    EventCard,
  },
  data() {
    return {
      loading: true,
      error: null,
      upcomingEvents: [],
      pastEvents: [],
      hasLocalStorage: true
    };
  },
  created() {
    // Check if localStorage is available
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      this.hasLocalStorage = true;
    } catch (e) {
      this.hasLocalStorage = false;
      this.error = 'Local storage is not available';
      return;
    }

    this.fetchEvents();
  },
  mounted() {
    // Add event listener for storage changes
    window.addEventListener('storage', this.handleStorageChange);
  },
  beforeDestroy() {
    window.removeEventListener('storage', this.handleStorageChange);
  },
  methods: {
    handleStorageChange(e) {
      if (e.key === 'events') {
        this.fetchEvents();
      }
    },
    async fetchEvents() {
      this.loading = true;
      this.error = null;

      try {
        console.log('Fetching events...');
        let events = [];

        // Try to get events from localStorage
        const storedEvents = localStorage.getItem('events');
        console.log('Raw stored events:', storedEvents);

        if (storedEvents) {
          events = JSON.parse(storedEvents);
          
          // Validate event structure
          events = events.map(event => {
            return {
              id: event.id || Date.now(),
              date: event.date || new Date().toISOString().slice(0, 10),
              imageUrl: event.imageUrl || '',
              en: {
                title: event?.en?.title || 'No Title',
                description: event?.en?.description || 'No description available'
              },
              ku: {
                title: event?.ku?.title || 'بێ ناونیشان',
                description: event?.ku?.description || 'وەسفی بەردەست نییە'
              }
            };
          });

          // Sort by date
          events.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        // Split into past and upcoming
        const today = new Date().toISOString().slice(0, 10);
        this.pastEvents = events.filter(event => event.date < today);
        this.upcomingEvents = events.filter(event => event.date >= today);

        console.log('Past events:', this.pastEvents);
        console.log('Upcoming events:', this.upcomingEvents);

      } catch (error) {
        console.error('Error fetching events:', error);
        this.error = 'Error loading events. Please try again.';
        this.pastEvents = [];
        this.upcomingEvents = [];
      } finally {
        this.loading = false;
      }
    },
  },
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
