<template>
  <div class="bg-light-background dark:bg-dark-background min-h-screen">
    <Header />
   
    <!-- Past Events Section -->
    <section class="p-6 max-w-6xl mx-auto mt-12">
      <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
        {{ $t('eventsPage.pastTitle') }}
      </h2>
      <div v-if="!pastEvents.length" class="text-center text-gray-600 dark:text-gray-400 p-8">
        {{ $t('eventsPage.noEvents') }}
      </div>
      <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <EventCard 
          v-for="event in sortedPastEvents" 
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
      pastEvents: [],
    };
  },
  computed: {
    sortedPastEvents() {
      return [...this.pastEvents].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  },
  created() {
    this.fetchEvents();
  },
  mounted() {
    // Add event listener for storage changes
    window.addEventListener('storage', this.fetchEvents);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.fetchEvents);
  },
  methods: {
    fetchEvents() {
      try {
        // Get events from localStorage
        const storedEvents = localStorage.getItem('events');
        if (!storedEvents) {
          this.pastEvents = [];
          return;
        }

        const events = JSON.parse(storedEvents);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Filter and validate events
        this.pastEvents = events
          .filter(event => {
            const eventDate = new Date(event.date);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate < today && this.isValidEvent(event);
          })
          .map(event => this.normalizeEvent(event));

      } catch (error) {
        console.error('Error fetching events:', error);
        this.pastEvents = [];
      }
    },
    isValidEvent(event) {
      return (
        event &&
        event.id &&
        event.date &&
        event.imageUrl &&
        event.en?.title &&
        event.en?.description &&
        event.ku?.title &&
        event.ku?.description
      );
    },
    normalizeEvent(event) {
      return {
        id: event.id,
        date: event.date,
        imageUrl: event.imageUrl,
        en: {
          title: event.en.title,
          description: event.en.description
        },
        ku: {
          title: event.ku.title,
          description: event.ku.description
        }
      };
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
