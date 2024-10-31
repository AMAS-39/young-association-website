<template>
  <div>
    <Header />

    <!-- Membership Info Section -->
    <section class="membership-info py-12 px-4 bg-gray-100 text-center">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">{{ $t('membership.title') }}</h1>
      <p class="text-lg text-gray-700 max-w-2xl mx-auto">
        {{ $t('membership.description') }}
      </p>
    </section>

    <!-- Application Form Section -->
    <section class="application-form py-12 px-4 max-w-lg mx-auto bg-white rounded-lg shadow-lg relative">
      <h2 class="text-2xl font-semibold text-center mb-6 text-gray-800">{{ $t('membership.formTitle') }}</h2>
      
      <!-- Success and Error Messages -->
      <div v-if="submitted" class="success-message absolute inset-0 bg-green-500 text-white flex items-center justify-center text-lg font-semibold rounded-lg transition-opacity duration-500">
        {{ $t('membership.successMessage') }}
      </div>
      <div v-if="errorMessage" class="error-message absolute inset-0 bg-red-500 text-white flex items-center justify-center text-lg font-semibold rounded-lg transition-opacity duration-500">
        {{ errorMessage }}
      </div>

      <!-- Form -->
      <form @submit.prevent="submitForm" class="space-y-4" v-if="!submitted && !errorMessage">
        <div>
          <label for="name" class="block text-gray-600 font-semibold">{{ $t('membership.nameLabel') }}</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            required
            class="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition duration-300"
            :placeholder="$t('membership.namePlaceholder')"
          />
        </div>
        
        <div>
          <label for="email" class="block text-gray-600 font-semibold">{{ $t('membership.emailLabel') }}</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            required
            class="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition duration-300"
            :placeholder="$t('membership.emailPlaceholder')"
          />
        </div>
        
        <div>
          <label for="cv" class="block text-gray-600 font-semibold">{{ $t('membership.cvLabel') }}</label>
          <div class="custom-file-input flex items-center">
            <input
              type="file"
              id="cv"
              @change="handleFileUpload"
              required
              class="hidden"
            />
            <label for="cv" class="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-l-lg cursor-pointer transition duration-300">
              Choose file
            </label>
            <span class="flex-1 px-3 py-2 border rounded-r-lg bg-white text-gray-600">{{ fileName || 'No file chosen' }}</span>
          </div>
        </div>

        <!-- Submit Button with Loading Indicator -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition duration-300 flex justify-center items-center"
        >
          <span v-if="loading" class="loader mr-2"></span>
          <span>{{ loading ? $t('membership.submitting') : $t('membership.apply') }}</span>
        </button>
      </form>
    </section>

    <Footer />
  </div>
</template>

<script>
import emailjs from '@emailjs/browser';
import Header from '@/components/MainHeader.vue';
import Footer from '@/components/MainFooter.vue';

export default {
  name: 'MembershipPage',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        cvFile: null,
      },
      fileName: '',
      submitted: false,
      loading: false,
      errorMessage: '',
    };
  },
  methods: {
    handleFileUpload(event) {
      this.formData.cvFile = event.target.files[0];
      this.fileName = this.formData.cvFile ? this.formData.cvFile.name : '';
    },
    async submitForm() {
      if (!this.formData.cvFile) {
        this.errorMessage = this.$t('membership.cvErrorMessage');
        return;
      }
      this.loading = true;
      this.errorMessage = '';
      try {
        await this.sendEmail();
        this.submitted = true;
        setTimeout(() => {
          this.submitted = false;
        }, 3000);
      } catch (error) {
        console.error('Error submitting form:', error);
        this.errorMessage = this.$t('membership.submitErrorMessage');
      } finally {
        this.loading = false;
      }
    },
    async sendEmail() {
      emailjs.init('YOUR_USER_ID');  // Replace with your actual User ID

      const emailParams = {
        name: this.formData.name,
        email: this.formData.email,
        cv_info: `Uploaded CV file: ${this.formData.cvFile.name}`,
      };

      await emailjs.send(
        'service_3ap298q',           // Service ID
        'template_an2c22i',          // Template ID
        emailParams,
        'nu9ZcIOllCcbl1G50'          // Replace with your actual User ID
      );
    },
  },
};
</script>

<style scoped>
.membership-info {
  background: #f7fafc;
}
.application-form {
  background: #ffffff;
}
.success-message, .error-message {
  opacity: 1;
  z-index: 10;
}
.custom-file-input {
  display: flex;
  align-items: center;
}
.loader {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
