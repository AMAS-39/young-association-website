<template>
  <div class="bg-light-background dark:bg-dark-background min-h-screen flex">
    <Header />

    <!-- Sidebar for Admin Navigation -->
    <aside class="w-1/4 bg-gray-100 dark:bg-gray-800 p-6">
      <h2 class="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">Admin Dashboard</h2>
      <nav class="space-y-4">
        <button @click="currentSection = 'news'" class="block w-full text-left px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">Manage News</button>
        <button @click="currentSection = 'gallery'" class="block w-full text-left px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">Manage Gallery</button>
        <button @click="currentSection = 'events'" class="block w-full text-left px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">Manage Events</button>
      </nav>
    </aside>

    <!-- Main Content Area for Admin Actions -->
    <main class="flex-1 p-8">
      <h1 class="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">{{ sectionTitle }}</h1>

      <!-- News Section -->
      <div v-if="currentSection === 'news'">
        <h2 class="text-2xl font-semibold text-black mb-4">News</h2>
        <button class="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" @click="openNewsForm()">Add New Article</button>
        <div class="space-y-4">
          <div v-for="article in newsArticles" :key="article.id" class="p-4 bg-white dark:bg-gray-700 shadow rounded-lg flex justify-between items-center">
            <div>
              <img :src="article.imageUrl" alt="News Image" class="w-16 h-16 object-cover rounded-lg mb-2">
              <h3 class="text-xl font-bold">{{ article.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300">{{ article.date }}</p>
              <p class="text-gray-700 dark:text-gray-200">{{ article.summary }}</p>
            </div>
            <div class="space-x-2">
              <button class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600" @click="openNewsForm(article)">Edit</button>
              <button class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600" @click="deleteArticle(article.id)">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Gallery Section -->
      <div v-if="currentSection === 'gallery'">
        <h2 class="text-2xl font-semibold text-black mb-4">Gallery</h2>
        <button class="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" @click="openGalleryForm()">Add New Image</button>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div v-for="image in gallery" :key="image.id" class="relative">
            <img :src="image.url" alt="Gallery Image" class="w-full h-48 object-cover rounded-lg shadow-lg mb-2">
            <p class="text-center text-gray-700 dark:text-gray-300">{{ image.description }}</p>
            <button class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" @click="deleteImage(image.id)">Delete</button>
          </div>
        </div>
      </div>

      <!-- Events Section -->
      <div v-if="currentSection === 'events'">
        <h2 class="text-2xl font-semibold text-black mb-4">Events</h2>
        <button class="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" @click="openEventForm()">Add New Event</button>
        <div class="space-y-4">
          <div v-for="event in events" :key="event.id" class="p-4 bg-white dark:bg-gray-700 shadow rounded-lg flex justify-between items-center">
            <div>
              <img :src="event.imageUrl" alt="Event Image" class="w-16 h-16 object-cover rounded-lg mb-2">
              <h3 class="text-xl font-bold">{{ event.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300">{{ event.date }}</p>
              <p class="text-gray-700 dark:text-gray-200">{{ event.description }}</p>
            </div>
            <div class="space-x-2">
              <button class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600" @click="openEventForm(event)">Edit</button>
              <button class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600" @click="deleteEvent(event.id)">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <!-- News Form Modal -->
      <div v-if="showNewsForm" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">{{ isEditingArticle ? 'Edit Article' : 'Add New Article' }}</h2>
          <form @submit.prevent="saveArticle">
            <div class="mb-4">
              <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Title</label>
              <input type="text" v-model="newsForm.title" class="w-full p-3 border rounded-lg" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Date</label>
              <input type="date" v-model="newsForm.date" class="w-full p-3 border rounded-lg" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Summary</label>
              <textarea v-model="newsForm.summary" rows="3" class="w-full p-3 border rounded-lg" required></textarea>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Image</label>
              <select v-model="newsForm.imageSource" class="w-full p-3 border rounded-lg mb-2">
                <option value="url">Use Image URL</option>
                <option value="upload">Upload Image</option>
              </select>
              <input v-if="newsForm.imageSource === 'url'" type="url" v-model="newsForm.imageUrl" placeholder="Image URL" class="w-full p-3 border rounded-lg mb-2" />
              <input v-if="newsForm.imageSource === 'upload'" type="file" @change="handleImageUpload('news')" class="w-full p-3 border rounded-lg mb-2" />
            </div>
            <div class="flex justify-end space-x-4">
              <button type="button" @click="closeForm('news')" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Cancel</button>
              <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{{ isEditingArticle ? 'Update Article' : 'Add Article' }}</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Gallery Form Modal -->
      <div v-if="showGalleryForm" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Add New Image</h2>
          <form @submit.prevent="saveImage">
            <div class="mb-4">
              <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Image</label>
              <select v-model="galleryForm.imageSource" class="w-full p-3 border rounded-lg mb-2">
                <option value="url">Use Image URL</option>
                <option value="upload">Upload Image</option>
              </select>
              <input v-if="galleryForm.imageSource === 'url'" type="url" v-model="galleryForm.url" placeholder="Image URL" class="w-full p-3 border rounded-lg mb-2" />
              <input v-if="galleryForm.imageSource === 'upload'" type="file" @change="handleImageUpload('gallery')" class="w-full p-3 border rounded-lg mb-2" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Description</label>
              <textarea v-model="galleryForm.description" rows="3" class="w-full p-3 border rounded-lg" required></textarea>
            </div>
            <div class="flex justify-end space-x-4">
              <button type="button" @click="closeForm('gallery')" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Cancel</button>
              <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Image</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Event Form Modal -->
      <div v-if="showEventForm" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">{{ isEditingEvent ? 'Edit Event' : 'Add New Event' }}</h2>
          <form @submit.prevent="saveEvent">
            <div class="mb-4">
              <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Title</label>
              <input type="text" v-model="eventForm.title" class="w-full p-3 border rounded-lg" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Date</label>
              <input type="date" v-model="eventForm.date" class="w-full p-3 border rounded-lg" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Description</label>
              <textarea v-model="eventForm.description" rows="3" class="w-full p-3 border rounded-lg" required></textarea>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Image</label>
              <select v-model="eventForm.imageSource" class="w-full p-3 border rounded-lg mb-2">
                <option value="url">Use Image URL</option>
                <option value="upload">Upload Image</option>
              </select>
              <input v-if="eventForm.imageSource === 'url'" type="url" v-model="eventForm.imageUrl" placeholder="Image URL" class="w-full p-3 border rounded-lg mb-2" />
              <input v-if="eventForm.imageSource === 'upload'" type="file" @change="handleImageUpload('event')" class="w-full p-3 border rounded-lg mb-2" />
            </div>
            <div class="flex justify-end space-x-4">
              <button type="button" @click="closeForm('event')" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Cancel</button>
              <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{{ isEditingEvent ? 'Update Event' : 'Add Event' }}</button>
            </div>
          </form>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script>

export default {
  name: 'AdminAccess',
  created() {
  if (!localStorage.getItem("isAuthenticated")) {
    this.$router.push("/login");
  }
},
  data() {
    return {
      currentSection: 'news',
      newsArticles: JSON.parse(localStorage.getItem('newsArticles')) || [],
      gallery: JSON.parse(localStorage.getItem('gallery')) || [],
      events: JSON.parse(localStorage.getItem('events')) || [],
      showNewsForm: false,
      showGalleryForm: false,
      showEventForm: false,
      isEditingArticle: false,
      isEditingEvent: false,
      newsForm: { id: null, title: '', date: '', summary: '', imageSource: 'url', imageUrl: '' },
      galleryForm: { id: null, url: '', description: '', imageSource: 'url' },
      eventForm: { id: null, title: '', date: '', description: '', imageSource: 'url', imageUrl: '' },
    };
  },
  computed: {
    sectionTitle() {
      if (this.currentSection === 'news') return 'Manage News';
      if (this.currentSection === 'gallery') return 'Manage Gallery';
      if (this.currentSection === 'events') return 'Manage Events';
      return 'Admin Dashboard';
    },
  },
  methods: {
    openNewsForm(article = null) {
      this.isEditingArticle = !!article;
      this.newsForm = article ? { ...article } : { id: Date.now(), title: '', date: '', summary: '', imageSource: 'url', imageUrl: '' };
      this.showNewsForm = true;
    },
    saveArticle() {
      if (this.isEditingArticle) {
        const index = this.newsArticles.findIndex(article => article.id === this.newsForm.id);
        if (index !== -1) this.newsArticles.splice(index, 1, { ...this.newsForm });
      } else {
        this.newsArticles.push({ ...this.newsForm });
      }
      this.saveData('newsArticles');
      this.closeForm('news');
    },
    deleteArticle(id) {
      this.newsArticles = this.newsArticles.filter(article => article.id !== id);
      this.saveData('newsArticles');
    },
    openGalleryForm() {
      this.showGalleryForm = true;
      this.galleryForm = { id: Date.now(), url: '', description: '', imageSource: 'url' };
    },
    saveImage() {
      this.gallery.push({ ...this.galleryForm });
      this.saveData('gallery');
      this.closeForm('gallery');
    },
    deleteImage(id) {
      this.gallery = this.gallery.filter(image => image.id !== id);
      this.saveData('gallery');
    },
    openEventForm(event = null) {
      this.isEditingEvent = !!event;
      this.eventForm = event ? { ...event } : { id: Date.now(), title: '', date: '', description: '', imageSource: 'url', imageUrl: '' };
      this.showEventForm = true;
    },
    saveEvent() {
      if (this.isEditingEvent) {
        const index = this.events.findIndex(event => event.id === this.eventForm.id);
        if (index !== -1) this.events.splice(index, 1, { ...this.eventForm });
      } else {
        this.events.push({ ...this.eventForm });
      }
      this.saveData('events');
      this.closeForm('event');
    },
    deleteEvent(id) {
      this.events = this.events.filter(event => event.id !== id);
      this.saveData('events');
    },
    // eslint-disable-next-line no-unused-vars
    handleImageUpload(type) {
      // Logic to handle image upload and generate a URL or local path for the image
      alert('Image upload is not implemented in this example.');
    },
    saveData(key) {
      localStorage.setItem(key, JSON.stringify(this[key]));
    },
    closeForm(type) {
      this[`show${type.charAt(0).toUpperCase() + type.slice(1)}Form`] = false;
    },
  },
};
</script>

<style scoped>
.bg-light-background {
  background-color: #f7fafc;
}
.bg-dark-background {
  background-color: #1a202c;
}
</style>
