import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createI18n } from 'vue-i18n';
import './tailwind.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import language files
import en from './locales/en.json';
import ku from './locales/ku.json';

// Set up i18n instance with locale messages
const i18n = createI18n({
  locale: localStorage.getItem('language') || 'en', // Default language
  fallbackLocale: 'en',
  messages: {
    en,
    ku,
  },
});

const app = createApp(App);
app.use(router);
app.use(i18n); // Use i18n instance
app.mount('#app');
AOS.init();
