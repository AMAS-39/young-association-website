<template>
  <div class="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text min-h-screen overflow-x-hidden">
    <Header />

    <!-- Mission and Vision Section -->
    <section class="py-12 px-4 md:px-16 lg:px-24 flex flex-col md:flex-row items-center transition-opacity duration-500 ease-in-out transform hover:scale-105">
      <div class="md:w-1/2 p-4" data-aos="fade-right">
        <h1 class="text-4xl md:text-5xl font-extrabold text-kurdishGreen dark:text-koreanBlue mb-6">
          {{ $t("about.missionTitle") }}
        </h1>
        <p class="text-lg md:text-xl leading-relaxed mb-4">
          {{ $t("about.missionDescription") }}
        </p>
      </div>
      <div class="md:w-1/2 p-4" data-aos="fade-left">
        <img :src="require('@/assets/mission.jpg')" alt="Mission Image" class="w-full h-auto rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105" />
      </div>
    </section>

    <!-- History Section -->
    <section class="py-12 px-4 md:px-16 lg:px-24 flex flex-col-reverse md:flex-row items-center bg-light-secondary dark:bg-dark-secondary transition-opacity duration-500 ease-in-out transform hover:scale-105">
      <div class="md:w-1/2 p-4" data-aos="fade-right">
        <img :src="require('@/assets/history.jpg')" alt="History Image" class="w-full h-auto rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105" />
      </div>
      <div class="md:w-1/2 p-4 text-center md:text-left" data-aos="fade-left">
        <h2 class="text-3xl md:text-4xl font-semibold text-koreanBlue dark:text-kurdishGreen mb-6">
          {{ $t("about.historyTitle") }}
        </h2>
        <p class="text-lg md:text-xl leading-relaxed">
          {{ $t("about.historyDescription") }}
        </p>
      </div>
    </section>

    <!-- Structure Section -->
    <section class="py-12 px-4 md:px-16 lg:px-24 flex flex-col md:flex-row items-center transition-opacity duration-500 ease-in-out transform hover:scale-105">
      <div class="md:w-1/2 p-4" data-aos="fade-right">
        <h2 class="text-3xl md:text-4xl font-semibold text-red-600 dark:text-red-400 mb-6">
          {{ $t("about.structureTitle") }}
        </h2>
        <ul class="text-lg md:text-xl leading-relaxed list-disc list-inside mb-4">
          <li>{{ $t("about.structurePoint1") }}</li>
          <li>{{ $t("about.structurePoint2") }}</li>
          <li>{{ $t("about.structurePoint3") }}</li>
        </ul>
      </div>
      <div class="md:w-1/2 p-4" data-aos="fade-left">
        <img :src="require('@/assets/structure.jpg')" alt="Structure Image" class="w-full h-auto rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105" />
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/MainHeader.vue';
import Footer from '@/components/MainFooter.vue';

export default {
  name: 'AboutUs',
  components: {
    Header,
    Footer,
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

.bg-light-secondary {
  background-color: #edf2f7;
}

.bg-dark-secondary {
  background-color: #2d3748;
}

/* Cultural Colors */
.text-kurdishGreen {
  color: #009b77;
}

.text-koreanBlue {
  color: #0c4da2;
}
</style>
