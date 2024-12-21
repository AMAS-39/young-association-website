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
        <!-- Logout Button -->
        <button @click="logout" class="block w-full text-left px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600">Logout</button>
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

<div v-if="currentSection === 'events'">
  <h2 class="text-2xl font-semibold text-black mb-4">Events</h2>
  <button class="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" @click="openEventForm()">Add New Event</button>
  <div class="space-y-4">
    <div v-for="event in events" :key="event.id" class="p-4 bg-white dark:bg-gray-700 shadow rounded-lg flex justify-between items-center">
      <div class="flex-1">
        <img :src="event.imageUrl" alt="Event Image" class="w-16 h-16 object-cover rounded-lg mb-2">
        <div class="grid grid-cols-2 gap-4">
          <!-- English Content -->
          <div>
            <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">English</h4>
            <h3 class="text-xl font-bold">{{ event.en.title }}</h3>
            <p class="text-gray-700 dark:text-gray-200">{{ event.en.description }}</p>
          </div>
          <!-- Kurdish Content -->
          <div>
            <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">Kurdish</h4>
            <h3 class="text-xl font-bold">{{ event.ku.title }}</h3>
            <p class="text-gray-700 dark:text-gray-200">{{ event.ku.description }}</p>
          </div>
        </div>
        <p class="text-gray-600 dark:text-gray-300 mt-2">{{ event.date }}</p>
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

     <!-- Updated Event Form Modal -->
<div v-if="showEventForm" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
  <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl w-full">
    <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">{{ isEditingEvent ? 'Edit Event' : 'Add New Event' }}</h2>
    <form @submit.prevent="saveEvent" class="space-y-4">
      <!-- Date and Image Section -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Date</label>
          <input type="date" v-model="eventForm.date" class="w-full p-3 border rounded-lg" required />
        </div>
        <div>
          <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Image</label>
          <select v-model="eventForm.imageSource" class="w-full p-3 border rounded-lg mb-2">
            <option value="url">Use Image URL</option>
            <option value="upload">Upload Image</option>
          </select>
          <input v-if="eventForm.imageSource === 'url'" type="url" v-model="eventForm.imageUrl" placeholder="Image URL" class="w-full p-3 border rounded-lg" />
          <input v-if="eventForm.imageSource === 'upload'" type="file" @change="handleImageUpload('event')" class="w-full p-3 border rounded-lg" />
        </div>
      </div>

      <!-- English Content -->
      <div class="border-t pt-4">
        <h3 class="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">English Content</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Title (English)</label>
            <input type="text" v-model="eventForm.en.title" class="w-full p-3 border rounded-lg" required />
          </div>
          <div>
            <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Description (English)</label>
            <textarea v-model="eventForm.en.description" rows="3" class="w-full p-3 border rounded-lg" required></textarea>
          </div>
        </div>
      </div>

      <!-- Kurdish Content -->
      <div class="border-t pt-4">
        <h3 class="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Kurdish Content</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Title (Kurdish)</label>
            <input type="text" v-model="eventForm.ku.title" class="w-full p-3 border rounded-lg" required dir="rtl" />
          </div>
          <div>
            <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Description (Kurdish)</label>
            <textarea v-model="eventForm.ku.description" rows="3" class="w-full p-3 border rounded-lg" required dir="rtl"></textarea>
          </div>
        </div>
      </div>

      <div class="flex justify-end space-x-4 pt-4">
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
      // Updated eventForm structure for bilingual support
      eventForm: {
        id: null,
        date: '',
        imageSource: 'url',
        imageUrl: '',
        en: {
          title: '',
          description: ''
        },
        ku: {
          title: '',
          description: ''
        }
      }
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
    // ... keep all your existing methods for news and gallery ...

    // Updated event methods
    openEventForm(event = null) {
      this.isEditingEvent = !!event;
      if (event) {
        // Handle existing events that might not have the language structure
        this.eventForm = {
          id: event.id,
          date: event.date,
          imageSource: event.imageSource || 'url',
          imageUrl: event.imageUrl || '',
          en: event.en || {
            title: event.title || '',
            description: event.description || ''
          },
          ku: event.ku || {
            title: '',
            description: ''
          }
        };
      } else {
        this.eventForm = {
          id: Date.now(),
          date: '',
          imageSource: 'url',
          imageUrl: '',
          en: {
            title: '',
            description: ''
          },
          ku: {
            title: '',
            description: ''
          }
        };
      }
      this.showEventForm = true;
    },

    saveEvent() {
      const eventData = {
        id: this.eventForm.id,
        date: this.eventForm.date,
        imageUrl: this.eventForm.imageUrl,
        imageSource: this.eventForm.imageSource,
        en: {
          title: this.eventForm.en.title,
          description: this.eventForm.en.description
        },
        ku: {
          title: this.eventForm.ku.title,
          description: this.eventForm.ku.description
        }
      };

      if (this.isEditingEvent) {
        const index = this.events.findIndex(event => event.id === this.eventForm.id);
        if (index !== -1) {
          this.events.splice(index, 1, eventData);
        }
      } else {
        this.events.push(eventData);
      }
      
      this.saveData('events');
      this.closeForm('event');
    },

    // Keep your existing methods for handling images, saving data, etc.
    handleImageUpload(type) {
      // Your existing image upload logic
      alert('Image upload is not implemented in this example.');
    },

    saveData(key) {
      localStorage.setItem(key, JSON.stringify(this[key]));
    },

    closeForm(type) {
      this[`show${type.charAt(0).toUpperCase() + type.slice(1)}Form`] = false;
    },

    logout() {
      localStorage.removeItem('isAuthenticated');
      this.$router.push('/login');
    }
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
