<template>
  <div :class="`${theme} transition-all duration-500 ease-in-out`">

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      theme: localStorage.getItem('theme') || 'light',
      currentLanguage: localStorage.getItem('language') || 'en',
    };
  },
  mounted() {
    document.body.classList.add(this.theme);
  },
  watch: {
    theme(newTheme, oldTheme) {
      document.body.classList.replace(oldTheme, newTheme);
    },
  },
  methods: {
    changeLanguage(lang) {
      this.currentLanguage = lang;
      this.$i18n.locale = lang;
      localStorage.setItem('language', lang);
    },
  },
};
</script>

<style>
.light {
  background-color: #f2f4f8;
  color: #222831;
}

.dark {
  background-color: #121212;
  color: #e0e0e0;
}

.language-toggle {
  position: absolute;
  top: 20px;
  right: 20px;
}

.language-toggle button {
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  background: transparent;
}

.language-toggle button.active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
