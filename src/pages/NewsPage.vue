<template>
  <div>
    <Header />
    <section class="news py-12 px-4">
      <h1 class="text-4xl font-bold text-center mb-8">{{ $t('news.title') }}</h1>
      <div class="news-list max-w-5xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="article in newsArticles" :key="article.id" class="news-card">
          <img :src="article.imageUrl" alt="News Image" class="w-full h-48 object-cover mb-4 rounded-lg">
          <h2 class="text-2xl font-semibold mb-2">{{ article.title }}</h2>
          <p class="text-gray-600 mb-4">{{ article.date }}</p>
          <p class="text-gray-700 mb-6">{{ article.summary }}</p>
          <button class="read-more-button" @click="viewArticle(article)">{{ $t('news.readMore') }}</button>
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
  name: 'NewsPage',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      newsArticles: JSON.parse(localStorage.getItem('newsArticles')) || [],
    };
  },
  methods: {
    viewArticle(article) {
      alert(`${this.$t('news.viewingArticle')} ${article.title}`);
    },
  },
};
</script>

<style scoped>
.news-list {
  display: grid;
  gap: 20px;
  text-align: left;
}
.news-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.news-card:hover {
  transform: scale(1.03);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
}
.read-more-button {
  display: inline-block;
  padding: 8px 16px;
  background: #1a73e8;
  color: white;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}
.read-more-button:hover {
  background-color: #0c5dbf;
}
</style>
