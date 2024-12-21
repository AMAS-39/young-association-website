<template>
  <div class="bg-light-background dark:bg-dark-background min-h-screen">
    <Header />

    <!-- Upcoming Events Section 
    <section class="p-6 max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">{{ $t('eventsPage.upcomingTitle') }}</h1>
      <p class="text-lg text-center text-gray-700 dark:text-gray-300 mb-8">{{ $t('eventsPage.upcomingDescription') }}</p>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <EventCard v-for="event in upcomingEvents" :key="event.id" :event="event" />
      </div>
    </section>-->

    <!-- Past Events Section -->
    <section class="p-6 max-w-6xl mx-auto mt-12">
      <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">{{ $t('eventsPage.pastTitle') }}</h2>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <EventCard v-for="event in pastEvents" :key="event.id" :event="event" />
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
      // Fetch events data from localStorage or an API and sort by date
      const events = JSON.parse(localStorage.getItem('events')) || [];
      const today = new Date().toISOString().slice(0, 10);
      
      this.upcomingEvents = events.filter(event => event.date >= today);
      this.pastEvents = events.filter(event => event.date < today);
    },
  },
};
</script>

<style scoped>
/* Dark and Light Mode Backgrounds */
.bg-light-background {
  background-color: #f7fafc;
}

.bg-dark-background {
  background-color: #1a202c;
}
</style>
