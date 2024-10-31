// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';

import AboutUs from '@/pages/AboutUs.vue';
import AdminAccess from '@/pages/AdminAccess.vue';
import HomePage from '@/pages/HomePage.vue';
import EventsPage from '@/pages/EventsPage.vue';
import NewsPage from '@/pages/NewsPage.vue';
import MembershipPage from '@/pages/MembershipPage.vue';
import GalleryPage from '@/pages/GalleryPage.vue';
import ContactPage from '@/pages/ContactPage.vue';
import loginPage from '@/pages/loginPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutUs },
  { path: '/events', component: EventsPage },
  { path: '/news', component: NewsPage },
  { path: '/membership', component: MembershipPage },
  { path: '/gallery', component: GalleryPage },
  { path: '/contact', component: ContactPage },
  { path: '/login', component: loginPage },
  {
    path: '/admin',
    component: AdminAccess,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('isAuthenticated') === 'true') {
        next();
      } else {
        next('/login');
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
