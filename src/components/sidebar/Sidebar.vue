<template>
  <aside
    class="h-screen bg-white w-64 shadow-lg md:block transition-transform duration-300 ease-in-out"
    :class="{
      absolute: windowWidth < 768,
      'translate-x-0': isSidebarOpen,
      '-translate-x-64': !isSidebarOpen && windowWidth < 768,
    }"
    v-if="windowWidth >= 768 || isSidebarOpen"
    ref="sidebar"
  >
    <div class="p-4">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-semibold">Artist Management</h2>
        <button
          @click="props.closeSidebar"
          class="p-1 text-gray-600 hover:text-gray-900 md:hidden"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      <ul class="mt-4">
        <li>
          <router-link
            to="#"
            class="block px-4 py-2 text-gray-600 hover:bg-blue-500 hover:text-white"
            >Dashboard</router-link
          >
        </li>
        <li>
          <router-link
            to="#"
            class="block px-4 py-2 text-gray-600 hover:bg-blue-500 hover:text-white"
            >Users</router-link
          >
        </li>
        <li>
          <router-link
            to="#"
            class="block px-4 py-2 text-gray-600 hover:bg-blue-500 hover:text-white"
            >Artists</router-link
          >
        </li>
        <li>
          <router-link
            to="#"
            class="block px-4 py-2 text-gray-600 hover:bg-blue-500 hover:text-white"
            >Musics</router-link
          >
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const windowWidth = ref(window.innerWidth);
const props = defineProps({
  isSidebarOpen: {
    type: Boolean,
    required: true,
  },
  closeSidebar: {
    type: Function,
    required: true,
  },
});

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener("resize", updateWindowWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateWindowWidth);
});
</script>

<style scoped>
/* Additional styles can go here */
</style>
