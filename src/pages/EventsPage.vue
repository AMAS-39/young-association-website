//EventsPage.vue
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
          v-for="event in formattedPastEvents" 
          :key="event.id" 
          :event="event" 
        />
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import { supabase } from '@/lib/supabaseClient'
import Header from '@/components/MainHeader.vue'
import Footer from '@/components/MainFooter.vue'
import EventCard from '@/components/EventCard.vue'

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
    }
  },
  computed: {
    formattedPastEvents() {
      return this.pastEvents.map(event => ({
        id: event.id,
        date: event.date,
        imageUrl: event.imageUrl,
        en: {
          title: event.en_title || 'No Title',
          description: event.en_description || 'No description available'
        },
        ku: {
          title: event.ku_title || 'بێ ناونیشان',
          description: event.ku_description || 'وەسفی بەردەست نییە'
        }
      }))
    },
    formattedUpcomingEvents() {
      return this.upcomingEvents.map(event => ({
        id: event.id,
        date: event.date,
        imageUrl: event.imageUrl,
        en: {
          title: event.en_title || 'No Title',
          description: event.en_description || 'No description available'
        },
        ku: {
          title: event.ku_title || 'بێ ناونیشان',
          description: event.ku_description || 'وەسفی بەردەست نییە'
        }
      }))
    }
  },
  created() {
    this.fetchEvents()
  },
  methods: {
    async fetchEvents() {
      this.loading = true
      this.error = null

      try {
        // Fetch events from Supabase
        const { data: events, error } = await supabase
          .from('events')
          .select('*')
          .order('date', { ascending: false })

        if (error) throw error

        // Split into past and upcoming
        const today = new Date().toISOString().slice(0, 10)
        this.pastEvents = events.filter(event => event.date < today)
        this.upcomingEvents = events.filter(event => event.date >= today)

      } catch (error) {
        console.error('Error fetching events:', error)
        this.error = 'Error loading events. Please try again.'
        this.pastEvents = []
        this.upcomingEvents = []
      } finally {
        this.loading = false
      }
    },
  },
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

