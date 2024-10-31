<template>
  <div class="bg-light-background dark:bg-dark-background min-h-screen flex flex-col">
    <Header />

    <!-- Contact Section -->
    <section class="flex-1 flex items-center justify-center py-10">
      <div class="max-w-lg w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 mx-4">
        <h1 class="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">{{ $t('contactPage.title') }}</h1>
        
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <!-- Name Input -->
          <div>
            <label for="name" class="block text-gray-700 dark:text-gray-300 font-semibold">{{ $t('contactPage.nameLabel') }}</label>
            <input
              type="text"
              id="name"
              required
              class="w-full p-3 mt-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              :placeholder="$t('contactPage.namePlaceholder')"
            />
          </div>
          
          <!-- Email Input -->
          <div>
            <label for="email" class="block text-gray-700 dark:text-gray-300 font-semibold">{{ $t('contactPage.emailLabel') }}</label>
            <input
              type="email"
              id="email"
              required
              class="w-full p-3 mt-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              :placeholder="$t('contactPage.emailPlaceholder')"
            />
          </div>
          
          <!-- Message Textarea -->
          <div>
            <label for="message" class="block text-gray-700 dark:text-gray-300 font-semibold">{{ $t('contactPage.messageLabel') }}</label>
            <textarea
              id="message"
              required
              rows="5"
              class="w-full p-3 mt-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
              :placeholder="$t('contactPage.messagePlaceholder')"
            ></textarea>
          </div>
          
          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-transform duration-200 transform hover:scale-105"
          >
            {{ $t('contactPage.submitButton') }}
          </button>
        </form>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/MainHeader.vue';
import Footer from '@/components/MainFooter.vue';

export default {
  name: 'ContactPage',
  components: {
    Header,
    Footer,
  },
  methods: {
    handleSubmit() {
      alert(this.$t('contactPage.successMessage'));
      // Here you can add logic to actually handle the form submission, such as sending data to an API.
    },
  },
};
</script>

<style scoped>
/* Custom Colors for Light and Dark Modes */
.bg-light-background {
  background-color: #f7fafc;
}

.bg-dark-background {
  background-color: #1a202c;
}

.text-light-text {
  color: #2d3748;
}

.text-dark-text {
  color: #edf2f7;
}
</style>
