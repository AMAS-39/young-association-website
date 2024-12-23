<template>
    <footer class="bg-kurdishGreen dark:bg-koreanBlue text-white p-6 shadow-md">
      <div class="container mx-auto flex flex-col items-center text-center">
        <p class="text-lg font-semibold">{{ $t("footer.copyright") }}</p>
        <p class="text-sm mt-2">{{ $t("footer.developer") }}</p>
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
    background-color:#266e6e;
  }
  
  .bg-koreanBlue {
    background-color: #0c4da2;
  }
  </style>