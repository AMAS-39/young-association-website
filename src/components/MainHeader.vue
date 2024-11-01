<template>
  <header class="bg-kurdishGreen dark:bg-koreanBlue text-white p-3 md:p-4 shadow-md">
    <div class="container mx-auto flex items-center justify-between">
      <!-- Logo / Brand Name -->
      <router-link to="/" class="flex items-center space-x-2 text-base md:text-lg lg:text-xl font-bold text-white">
        <img :src="logoSrc" alt="Logo" class="w-8 h-8 md:w-14 md:h-14 lg:w-20 lg:h-20" />
        <!-- Show full title only on lg and above, abbreviation on smaller screens -->
        <span class="hidden lg:inline">{{ $t("header.title") }}</span>
        <span class="inline lg:hidden">KKYA</span>
      </router-link>

      <!-- Desktop Navigation Links -->
      <nav class="hidden md:flex text-sm md:text-base lg:text-lg space-x-2 md:space-x-4 ml-auto">
        <router-link to="/" class="hover:text-gray-300">{{ $t("header.home") }}</router-link>
        <router-link to="/about" class="hover:text-gray-300">{{ $t("header.about") }}</router-link>
        <router-link to="/events" class="hover:text-gray-300">{{ $t("header.events") }}</router-link>
        <router-link to="/news" class="hover:text-gray-300">{{ $t("header.news") }}</router-link>
        <router-link to="/membership" class="hover:text-gray-300">{{ $t("header.membership") }}</router-link>
        <router-link to="/gallery" class="hover:text-gray-300">{{ $t("header.gallery") }}</router-link>
        <router-link to="/contact" class="hover:text-gray-300">{{ $t("header.contact") }}</router-link>
      </nav>

      <!-- Language Dropdown and Burger Menu (Mobile) -->
      <div class="flex items-center ml-4 space-x-3 relative">
        <!-- Language Dropdown with Custom Styling -->
        <div class="relative">
          <button @click="toggleLanguageMenu" class="bg-white text-gray-800 dark:bg-gray-200 dark:text-gray-900 font-semibold px-3 py-2 rounded-lg shadow transition hover:bg-gray-100 dark:hover:bg-gray-300 text-sm md:text-base">
            {{ languageLabel }}
          </button>
          <transition name="fade">
            <div v-if="languageMenuOpen" class="absolute right-0 mt-2 w-28 md:w-36 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg shadow-lg z-20">
              <button @click="changeLanguage('en')" class="block px-4 py-2 text-left w-full hover:bg-gray-100 dark:hover:bg-gray-600">
                English
              </button>
              <button @click="changeLanguage('ku')" class="block px-4 py-2 text-left w-full hover:bg-gray-100 dark:hover:bg-gray-600">
                کوردی
              </button>
            </div>
          </transition>
        </div>

        <!-- Mobile Menu Toggle -->
        <button @click="toggleMenu" class="md:hidden text-2xl focus:outline-none">
          <span v-if="menuOpen">✖</span>
          <span v-else>☰</span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu with Slide Animation -->
    <transition name="slide">
      <nav v-if="menuOpen" class="md:hidden mt-4 space-y-4 text-center bg-gray-800 p-4 rounded shadow-lg">
        <router-link to="/" @click="closeMenu" class="block hover:text-gray-300">{{ $t("header.home") }}</router-link>
        <router-link to="/about" @click="closeMenu" class="block hover:text-gray-300">{{ $t("header.about") }}</router-link>
        <router-link to="/events" @click="closeMenu" class="block hover:text-gray-300">{{ $t("header.events") }}</router-link>
        <router-link to="/news" @click="closeMenu" class="block hover:text-gray-300">{{ $t("header.news") }}</router-link>
        <router-link to="/membership" @click="closeMenu" class="block hover:text-gray-300">{{ $t("header.membership") }}</router-link>
        <router-link to="/gallery" @click="closeMenu" class="block hover:text-gray-300">{{ $t("header.gallery") }}</router-link>
        <router-link to="/contact" @click="closeMenu" class="block hover:text-gray-300">{{ $t("header.contact") }}</router-link>
      </nav>
    </transition>
  </header>
</template>

<script>
export default {
  name: 'MainHeader',
  data() {
    return {
      menuOpen: false,
      languageMenuOpen: false,
    };
  },
  computed: {
    logoSrc() {
      return require('@/assets/logo.png');
    },
    languageLabel() {
      return this.$i18n.locale === 'en' ? 'Language' : 'زمانەکان';
    },
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    },
    toggleLanguageMenu() {
      this.languageMenuOpen = !this.languageMenuOpen;
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang;
      localStorage.setItem('language', lang);
      this.languageMenuOpen = false;
    },
    closeDropdownOnOutsideClick(event) {
      if (!this.$el.contains(event.target)) {
        this.languageMenuOpen = false;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.closeDropdownOnOutsideClick);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdownOnOutsideClick);
  }
};
</script>

<style scoped>
/* Fade Transition for Language Menu */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Slide Transition for Mobile Menu */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.4s ease, opacity 0.3s ease;
}
.slide-enter {
  transform: translateY(-50%);
  opacity: 0;
}
.slide-leave-to {
  transform: translateY(-50%);
  opacity: 0;
}

.bg-kurdishGreen {
  background-color: #266e6e;
}
.bg-koreanBlue {
  background-color: #0c4da2;
}

/* Responsive Adjustments */
@media (max-width: 1024px) {
  /* Switch to KKYA on tablet and below */
  .text-lg {
    font-size: 0.9rem;
  }
  .partner-logo {
    width: 100px;
    max-width: 120px;
  }
}
</style>
