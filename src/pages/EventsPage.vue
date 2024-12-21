<template>
  <div class="bg-light-background dark:bg-dark-background min-h-screen">
    <Header />
   
    <!-- Past Events Section -->
    <section class="p-6 max-w-6xl mx-auto mt-12">
      <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
        {{ $t('eventsPage.pastTitle') }}
      </h2>
      <div v-if="pastEvents.length === 0" class="text-center text-gray-600 dark:text-gray-400">
        {{ $t('eventsPage.noEvents') }}
      </div>
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
      upcomingEvents: [],
      pastEvents: [],
    };
  },
  created() {
    this.fetchEvents();
  },
  methods: {
    fetchEvents() {
      try {
        // Fetch events data from localStorage
        const events = JSON.parse(localStorage.getItem('events')) || [];
        const today = new Date().toISOString().slice(0, 10);
        
        // Ensure each event has the correct structure
        const validEvents = events.map(event => ({
          id: event.id,
          date: event.date,
          imageUrl: event.imageUrl,
          en: {
            title: event?.en?.title || '',
            description: event?.en?.description || ''
          },
          ku: {
            title: event?.ku?.title || '',
            description: event?.ku?.description || ''
          }
        }));
        
        // Filter events
        this.upcomingEvents = validEvents.filter(event => event.date >= today);
        this.pastEvents = validEvents.filter(event => event.date < today);
      } catch (error) {
        console.error('Error fetching events:', error);
        this.upcomingEvents = [];
        this.pastEvents = [];
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
