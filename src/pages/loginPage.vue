<!-- src/pages/loginPage.vue -->
<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div class="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-2xl transform transition-all duration-300 hover:scale-105">
        <h1 class="text-4xl font-extrabold mb-8 text-gray-900 dark:text-gray-100 text-center">Admin Login</h1>
        <form @submit.prevent="login" class="space-y-6">
          <div>
            <label for="username" class="block text-gray-800 dark:text-gray-300 font-medium mb-1">Username</label>
            <input
              type="text"
              id="username"
              v-model="username"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label for="password" class="block text-gray-800 dark:text-gray-300 font-medium mb-1">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors transform hover:scale-105"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'loginPage',
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      login() {
        if (this.username === 'admin123@' && this.password === 'admin123@') {
          localStorage.setItem('isAuthenticated', 'true');
          this.$router.push('/admin');
        } else {
          alert('Invalid credentials');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Additional styling for transitions */
  input:focus {
    outline: none;
  }
  
  button:focus {
    outline: none;
  }
  </style>
  