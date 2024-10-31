<template>
  <div>
    <Header />

    <!-- Hero Section with Parallax Effect and Fade-in Text -->
    <section class="hero">
      <div class="hero-overlay">
        <h1 class="hero-title">{{ $t('home.heroTitle') }}</h1>
        <p class="hero-subtitle">{{ $t('home.heroSubtitle') }}</p>
        <div class="quick-links">
  <router-link to="/membership" class="cta">{{ $t('home.joinUs') }}</router-link>
  <router-link to="/about" class="cta">{{ $t('home.learnMore') }}</router-link>
</div>

      </div>
    </section>

    <!-- About Section with Larger Images and Centered Layout -->
    <section class="about py-8">
      <h2 class="section-title">{{ $t('home.aboutTitle') }}</h2>
      <p class="section-subtitle mx-auto mb-8">{{ $t('home.aboutSubtitle') }}</p>
      <div class="about-details max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
        <div class="about-item" v-for="item in aboutItems" :key="item.title">
          <img :src="item.image" :alt="item.title" class="about-image mx-auto mb-4" />
          <h3 class="text-xl font-semibold">{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </section>

    <!-- Highlight Section with Centered Layout and Improved Styling -->
    <section class="highlights py-8">
      <h2 class="section-title">{{ $t('home.keyInitiativesTitle') }}</h2>
      <div class="highlights-grid max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div class="highlight-card" v-for="initiative in initiatives" :key="initiative.id">
          <div class="highlight-image-container">
            <img :src="initiative.image" :alt="initiative.title" loading="lazy" class="highlight-image mb-4">
          </div>
          <h3 class="text-lg font-semibold mb-2">{{ initiative.title }}</h3>
          <p>{{ initiative.description }}</p>
        </div>
      </div>
    </section>

    <!-- Testimonials Section Carousel with Centered Layout -->
    <section class="testimonials py-12 bg-gray-50 dark:bg-gray-800">
      <h2 class="section-title mb-8">{{ $t('home.testimonialsTitle') }}</h2>
      <div class="testimonial-carousel-container relative">
        <div class="testimonial-carousel flex overflow-x-auto gap-6 justify-center px-4 pb-6">
          <div class="testimonial" v-for="testimonial in testimonials" :key="testimonial.id">
            <p class="testimonial-quote">"{{ testimonial.quote }}"</p>
            <p class="testimonial-name">- {{ testimonial.name }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Partners Section with Unique Styling and No Div Wrappers -->
    <section class="partners py-12 bg-gray-100 dark:bg-gray-900">
      <h2 class="section-title mb-8">{{ $t('home.partnersTitle') }}</h2>
      <div class="partners-grid max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-4 text-center">
        <template v-for="partner in partners" :key="partner.id">
          <h3 class="partner-name text-xl font-semibold text-gray-800 dark:text-gray-200">{{ partner.name }}</h3>
          <img :src="partner.logo" :alt="partner.name" class="partner-logo">
        </template>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/MainHeader.vue';
import Footer from '@/components/MainFooter.vue';

export default {
  name: 'HomePage',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      aboutItems: [
        { title: this.$t('home.mission'), description: this.$t('home.missionDesc'), image: require('@/assets/mission.jpg') },
        { title: this.$t('home.vision'), description: this.$t('home.visionDesc'), image: require('@/assets/vision.png') },
        { title: this.$t('home.partnerships'), description: this.$t('home.partnershipsDesc'), image: require('@/assets/partnership.png') },
      ],
      initiatives: [
        { id: 1, title: this.$t('home.initiative1'), description: this.$t('home.initiative1Desc'), image: require('@/assets/conference.jpg') },
        { id: 2, title: this.$t('home.initiative2'), description: this.$t('home.initiative2Desc'), image: require('@/assets/community.jpg') },
      ],
      testimonials: [
        { id: 1, quote: this.$t('home.testimonial1Quote'), name: this.$t('home.testimonial1Name') },
        { id: 2, quote: this.$t('home.testimonial2Quote'), name: this.$t('home.testimonial2Name') },
      ],
      partners: [
        { id: 1, name: 'Korean Consulate', logo: require('@/assets/korean_consulate.png') },
        { id: 2, name: 'Local Business Council', logo: require('@/assets/business_council.png') },
      ],
    };
  },
};
</script>


<style scoped>
/* Hero Section Styling */
.hero {
  background-image: url('@/assets/background.png');
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  color: #ffffff;
  padding: 120px 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.hero-overlay {
  background: rgba(0, 0, 0, 0.7);
  padding: 40px;
  border-radius: 12px;
  animation: fadeIn 1s ease-in-out;
}
.hero-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 20px;
  animation: slideIn 1s ease-in-out;
}
.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: #cfd8dc;
}
.cta {
  margin: 10px;
  padding: 12px 30px;
  background: #f44336;
  color: white;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
}
.cta:hover {
  background: #d32f2f;
  transform: scale(1.1);
}

/* About Section */
.section-title {
  text-align: center;
  font-size: 2.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}
.section-subtitle {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 2rem;
  color: #757575;
}
.about-details {
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  margin-top: 20px;
}
.about-item {
  padding: 15px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.about-item:hover {
  transform: translateY(-8px);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
}
.about-image {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
  border-radius: 50%;
}

/* Highlights Section */
.highlights-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
.highlight-card {
  background: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.highlight-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
}
.highlight-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.highlight-image {
  max-width: 80%;
  border-radius: 8px;
  margin-bottom: 15px;
}


/* Testimonials Section */
.section-title {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
}
.testimonial-carousel-container {
  position: relative;
  overflow: hidden;
  max-width: 100%;
}
.testimonial-carousel {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 1rem;
}
.testimonial {
  min-width: 280px;
  max-width: 350px;
  background: linear-gradient(135deg, #ffffff, #f9f9f9);
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
  scroll-snap-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: #333;
  border: 1px solid #e0e0e0;
}
.testimonial:hover {
  transform: scale(1.05);
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.2);
}
.testimonial-quote {
  font-size: 1.2rem;
  font-style: italic;
  color: #555;
  margin-bottom: 12px;
}
.testimonial-name {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
}

/* Add Media Queries for Responsiveness */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  .testimonial {
    min-width: 80%;
  }
}

/* Partners Section */
.partners-grid {
  display: grid;
  gap: 30px;
  text-align: center;
  align-items: center;
}
.partner-name {
  font-size: 1.1rem;
  color: #555;
  transition: color 0.3s ease;
}
.partner-logo {
  width: 80%;
  max-width: 120px;
  height: auto;
  transition: transform 0.3s ease, opacity 0.3s ease;
  margin: 0 auto; /* Center align */
}
.partner-logo:hover {
  transform: scale(1.1);
  opacity: 0.9;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .partner-name {
    font-size: 1rem;
  }
}




/* Keyframes for Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }




  
}





.quick-links {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

/* Button Styles */
.cta {
  padding: 12px 30px;
  background: #f44336;
  color: white;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  text-align: center;
  transition: background-color 0.3s ease, transform 0.3s ease;
}
.cta:hover {
  background: #d32f2f;
  transform: scale(1.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .quick-links {
    flex-direction: column;
    width: 100%;
    padding: 0 20px;
  }
  
  .cta {
    width: 100%; /* Full width on smaller screens */
    font-size: 1rem; /* Adjust font size for better readability */
  }
}

</style>
