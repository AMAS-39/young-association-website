<template>
  <footer class="bg-kurdishGreen dark:bg-koreanBlue text-white p-6 shadow-md">
    <div class="container mx-auto flex flex-col items-center text-center">
      <p class="text-lg font-semibold">{{ $t("footer.copyright") }}</p>
      <p class="text-sm mt-2">{{ $t("footer.developer") }}</p>
      
      <!-- Login Button -->
      <router-link to="/login" class="mt-4">
        <button class="login-btn px-6 py-2 font-semibold rounded-lg shadow-md transform transition-transform duration-200 hover:scale-105">
          {{ $t("footer.loginButton") }}
        </button>
      </router-link>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'MainFooter',
};
</script>

<style scoped>
.bg-kurdishGreen {
  background-color: #266e6e;
}

.bg-koreanBlue {
  background-color: #0c4da2;
}

/* Button Styling */
.login-btn {
  background-color: #ffffff;
  color: #0c4da2;
  border: 2px solid #0c4da2;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  transition: background-color 0.3s, color 0.3s;
  font-size: 1rem;
}

.login-btn:hover {
  background-color: #0c4da2;
  color: #ffffff;
  cursor: pointer;
}
</style>
