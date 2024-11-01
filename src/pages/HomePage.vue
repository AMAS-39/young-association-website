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
    <section class="about py-8 px-4 mx-auto max-w-6xl">
      <h2 class="section-title">{{ $t('home.aboutTitle') }}</h2>
      <p class="section-subtitle mx-auto mb-8">{{ $t('home.aboutSubtitle') }}</p>
      <div class="about-details grid gap-8 md:grid-cols-3">
        <div class="about-item" v-for="item in aboutItems" :key="item.title">
          <img :src="item.image" :alt="item.title" class="about-image mx-auto mb-4" />
          <h3 class="text-xl font-semibold">{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </section>

    <!-- Highlights Section -->
    <section class="highlights py-8 px-4 mx-auto max-w-6xl">
      <h2 class="section-title">{{ $t('home.keyInitiativesTitle') }}</h2>
      <div class="highlights-grid grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div class="highlight-card" v-for="initiative in initiatives" :key="initiative.id">
          <div class="highlight-image-container">
            <img :src="initiative.image" :alt="initiative.title" loading="lazy" class="highlight-image mb-4">
          </div>
          <h3 class="text-lg font-semibold mb-2">{{ initiative.title }}</h3>
          <p>{{ initiative.description }}</p>
        </div>
      </div>
    </section>

    <!-- Updated Testimonials Section with Modern Carousel -->
<section class="testimonials py-12 bg-gray-50 dark:bg-gray-800 px-4">
  <h2 class="section-title mb-8">{{ $t('home.testimonialsTitle') }}</h2>
  <div class="testimonial-carousel-container relative max-w-4xl mx-auto">
    <!-- Carousel Wrapper -->
    <div class="testimonial-carousel flex transition-all duration-500 ease-out" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
      <div v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-slide">
        <div class="testimonial-card">
          <p class="testimonial-quote">"{{ testimonial.quote }}"</p>
          <p class="testimonial-name">- {{ testimonial.name }}</p>
        </div>
      </div>
    </div>

    <!-- Navigation Arrows -->
    <button class="carousel-nav left" @click="prevSlide">❮</button>
    <button class="carousel-nav right" @click="nextSlide">❯</button>
  </div>
</section>


    <!-- Partners Section with Redesigned Layout -->
<section class="partners py-12 bg-gray-100 dark:bg-gray-900 px-4">
  <h2 class="section-title mb-8">{{ $t('home.partnersTitle') }}</h2>
  <div class="partners-grid max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
    <template v-for="partner in partners" :key="partner.id">
      <div class="partner-item bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <img :src="partner.logo" :alt="partner.name" class="partner-logo mx-auto mb-4">
        <h3 class="partner-name text-lg font-semibold text-gray-700 dark:text-gray-200">{{ partner.name }}</h3>
      </div>
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
      currentSlide: 0, // Add this line
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
  computed: {
    slideCount() {
      return this.testimonials.length;
    },
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slideCount;
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.slideCount) % this.slideCount;
    },
  },
  mounted() {
    setInterval(this.nextSlide, 5000); // Auto-slide every 5 seconds
  },
};
</script>


<style scoped>
/* Hero Section Styling */
/* Hero Section Styling */
.hero {
  background-image: url('@/assets/history.jpg');
  background-attachment: fixed;
  background-position: center;
  background-size: cover; /* Default for larger screens */
  color: #ffffff;
  padding: 120px 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 100vh; /* Using vh instead of dvh for mobile stability */
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

/* Button Styles */
.quick-links {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

.cta {
  padding: 12px 30px;
  background: #0c4da2;
  color: white;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  text-align: center;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.cta:hover {
  background: #083b7b;
  transform: scale(1.05);
}

/* Responsive Adjustments */
@media (max-width: 1024px) {
  .hero {
    background-size: contain; /* Ensure the whole image fits on screen */
  }
}

@media (max-width: 768px) {
  .hero {
    background-attachment: scroll; /* Disable parallax effect for smoother scrolling */
    background-size: cover; /* Cover the mobile screen without zooming */
    min-height: 60vh; /* Adjust height for smaller screens */
  }
  
  .hero-title {
    font-size: 2.5rem; /* Adjust font size for mobile */
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .quick-links {
    flex-direction: column;
    width: 100%;
    padding: 0 20px;
  }

  .cta {
    width: 100%;
    font-size: 1rem;
  }
}


/* About Section */
.section-title {
  text-align: center;
  font-size: 2.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
  padding-top: 20px;
}
.section-subtitle {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 2rem;
  color: #757575;
}
.about-details {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  margin-top: 20px;
  padding: 0 20px; /* Add padding */
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
  padding: 0 20px; /* Add padding */
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

/* Testimonials Section Styling */
.testimonials {
  padding: 20px;
  background-color: #f9fafb; /* Light background */
}
.section-title {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

/* Carousel Wrapper */
.testimonial-carousel-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
.testimonial-carousel {
  display: flex;
  transition: transform 0.5s ease;
}
.testimonial-slide {
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Testimonial Card */
.testimonial-card {
  background: linear-gradient(135deg, #ffffff, #f0f0f0);
  border-radius: 12px;
  padding: 20px;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s, box-shadow 0.3s;
  color: #333;
  border: 2px solid #e0e0e0;
}
.testimonial-card:hover {
  transform: scale(1.03);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}
.testimonial-quote {
  font-size: 1.2rem;
  font-style: italic;
  color: #555;
  margin-bottom: 10px;
}
.testimonial-name {
  font-size: 1rem;
  font-weight: bold;
  color: #222;
}

/* Navigation Arrows */
.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
  color: #333;
  background: rgba(255, 255, 255, 0.7);
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 50%;
  transition: background 0.3s;
}
.carousel-nav:hover {
  background: rgba(255, 255, 255, 0.9);
}
.carousel-nav.left {
  left: 10px;
}
.carousel-nav.right {
  right: 10px;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .testimonial-card {
    padding: 15px;
  }
  .testimonial-quote {
    font-size: 1rem;
  }
  .testimonial-name {
    font-size: 0.9rem;
  }
}


/* Partners Section */
.partners {
  padding: 3rem 1rem;
  background-color: #f7fafc;
}
.section-title {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}
.partners-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  text-align: center;
  padding: 0 20px;
  align-items: center;
}

/* Partner Item */
.partner-item {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.partner-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Partner Logo */
.partner-logo {
  width: 100%;
  max-width: 220px;
  height: auto;
  border-radius: 8px;
  border: 2px solid #ddd;
  padding: 8px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.partner-logo:hover {
  transform: scale(1.05);
  opacity: 0.95;
}

/* Partner Name */
.partner-name {
  font-size: 1.1rem;
  color: #555;
  margin-top: 8px;
  transition: color 0.3s ease;
}
.partner-item:hover .partner-name {
  color: #009b77;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .partners-grid {
    gap: 1.5rem;
  }
  .partner-logo {
    max-width: 150px;
  }
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


</style>
