<template>
  <div class="bg-light-background dark:bg-dark-background min-h-screen">
    <Header />
   
    <!-- Past Events Section -->
    <section class="p-6 max-w-6xl mx-auto mt-12">
      <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
        {{ $t('eventsPage.pastTitle') }}
      </h2>
      
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-8">
        <p class="text-gray-600 dark:text-gray-400">Loading events...</p>
      </div>

      <!-- No Events State -->
      <div v-else-if="!hasEvents" class="text-center py-8">
        <p class="text-gray-600 dark:text-gray-400">{{ $t('eventsPage.noEvents') }}</p>
      </div>

      <!-- Events Grid -->
      <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <EventCard 
          v-for="event in sortedEvents" 
          :key="event.id" 
          :event="event"
          :current-language="currentLanguage" 
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
      events: [],
      error: null
    };
  },
  computed: {
    currentLanguage() {
      return this.$i18n?.locale || localStorage.getItem('language') || 'en';
    },
    hasEvents() {
      return this.events && this.events.length > 0;
    },
    sortedEvents() {
      return [...this.events].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  },
  created() {
    this.loadEvents();
  },
  methods: {
    loadEvents() {
      this.loading = true;
      try {
        // Get events from localStorage
        const storedEvents = localStorage.getItem('events');
        console.log('Stored events:', storedEvents); // Debug log

        if (!storedEvents) {
          this.events = [];
          return;
        }

        // Parse the events
        const parsedEvents = JSON.parse(storedEvents);
        
        // Validate and transform events
        this.events = parsedEvents.map(event => ({
          id: event.id || Date.now(),
          date: event.date || new Date().toISOString().slice(0, 10),
          imageUrl: event.imageUrl || '/placeholder-image.jpg',
          en: {
            title: event?.en?.title || 'Untitled',
            description: event?.en?.description || 'No description available'
          },
          ku: {
            title: event?.ku?.title || 'بێ ناونیشان',
            description: event?.ku?.description || 'هیچ وەسفێک بەردەست نییە'
          }
        }));

        console.log('Processed events:', this.events); // Debug log
      } catch (error) {
        console.error('Error loading events:', error);
        this.error = error.message;
        this.events = [];
      } finally {
        this.loading = false;
      }
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
