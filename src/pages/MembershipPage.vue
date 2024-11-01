<template>
  <div>
    <Header />

    <!-- Membership Info Section -->
    <section class="membership-info py-16 px-4 bg-gray-50 text-center">
      <div class="info-card mx-auto bg-white shadow-md rounded-lg p-8 max-w-lg">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ $t('membership.title') }}</h1>
        <p class="text-lg text-gray-600 mb-8">
          {{ $t('membership.description') }}
        </p>
        <a
          href="https://forms.gle/JvHLY7Uk32rbLQyZ6" 
          target="_blank" 
          rel="noopener noreferrer"
          class="cta-button"
        >
          {{ $t('membership.enrollNow') }}
        </a>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/MainHeader.vue';
import Footer from '@/components/MainFooter.vue';

export default {
  name: 'MembershipPage',
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
/* Membership Info Section */
.membership-info {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
}
.info-card {
  text-align: center;
  padding: 2rem;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.info-card h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
}
.info-card p {
  font-size: 1rem;
  color: #555;
  margin-bottom: 1.5rem;
}
.cta-button {
  display: inline-block;
  padding: 0.75rem 2rem;
  background-color: #4a90e2;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.3s;
}
.cta-button:hover {
  background-color: #357ABD;
  transform: scale(1.05);
}
</style>
