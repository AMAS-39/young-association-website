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
              v-model="name"
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
              v-model="email"
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
              v-model="message"
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

    <!-- Success/Error Message Overlay -->
    <transition name="modal">
      <div v-if="messageStatus" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div :class="{'bg-green-500': messageStatus === 'success', 'bg-red-500': messageStatus === 'error'}" 
             class="p-6 rounded-lg shadow-2xl text-white max-w-xs w-full text-center transform transition-all duration-500 scale-100 hover:scale-105">
          <p class="text-lg font-semibold">{{ feedbackMessage }}</p>
          <button @click="closeMessage" class="mt-4 bg-white text-gray-800 rounded-lg px-4 py-2 font-semibold hover:bg-gray-200 transition duration-300">
            OK
          </button>
        </div>
      </div>
    </transition>

    <Footer />
  </div>
</template>

<script>
import emailjs from '@emailjs/browser';
import Header from '@/components/MainHeader.vue';
import Footer from '@/components/MainFooter.vue';

export default {
  name: 'ContactPage',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      name: '',
      email: '',
      message: '',
      messageStatus: '', // Tracks if message was sent successfully or failed
      feedbackMessage: '', // Message displayed in overlay
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await emailjs.send('service_4772qeo', 'template_6einljd', {
          name: this.name,
          email: this.email,
          message: this.message,
        }, 'nu9ZcIOllCcbl1G50');

        if (response.status === 200) {
          this.messageStatus = 'success';
          this.feedbackMessage = this.$t('contactPage.successMessage');
          // Clear form fields after successful submission
          this.name = '';
          this.email = '';
          this.message = '';
        } else {
          this.messageStatus = 'error';
          this.feedbackMessage = this.$t('contactPage.errorMessage');
        }
      } catch (error) {
        console.error("Failed to send email:", error);
        this.messageStatus = 'error';
        this.feedbackMessage = this.$t('contactPage.errorMessage');
      }
    },
    closeMessage() {
      this.messageStatus = '';
      this.feedbackMessage = '';
    }
  },
};
</script>

<style scoped>
/* Background colors */
.bg-light-background {
  background-color: #f7fafc;
}
.bg-dark-background {
  background-color: #1a202c;
}

/* Fade Transition */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.modal-enter, .modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Message Overlay Colors */
.bg-green-500 {
  background-color: #38a169;
}
.bg-red-500 {
  background-color: #e53e3e;
}

/* Button Styling */
button {
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
}
button:hover {
  transform: scale(1.05);
}
</style>
