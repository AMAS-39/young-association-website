<template>
  <div class="bg-light-background dark:bg-dark-background min-h-screen">
    <Header />

    <section class="gallery p-4 max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">{{ $t('galleryPage.title') }}</h1>
      <div class="gallery-grid">
        <div v-for="image in gallery" :key="image.id" class="relative">
          <img :src="image.url" :alt="$t('galleryPage.imageAlt')" class="w-full h-auto rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/MainHeader.vue';
import Footer from '@/components/MainFooter.vue';

export default {
  name: 'GalleryPage',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      gallery: JSON.parse(localStorage.getItem('gallery')) || [],
    };
  },
};
</script>

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}
.bg-light-background {
  background-color: #f7fafc;
}

.bg-dark-background {
  background-color: #1a202c;
}
</style>
