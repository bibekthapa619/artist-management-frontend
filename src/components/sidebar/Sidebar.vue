<template>
  <aside
    class="h-screen bg-white w-64 shadow-lg md:block transition-transform duration-300 ease-in-out"
    :class="{
      absolute: windowWidth < 768,
      'translate-x-0': isSidebarOpen,
      '-translate-x-64': !isSidebarOpen && windowWidth < 768,
    }"
    ref="sidebar"
  >
    <div class="">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-semibold p-4">Artist Management</h2>
        <button
          @click="closeSidebar"
          class="p-4 text-gray-600 hover:text-gray-900 md:hidden"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      <ul class="mt-4">
        <li v-for="(route, index) in routes" :key="index">
          <div
            @click="navigateTo(route.path)"
            class="block px-4 py-2 text-gray-600 hover:bg-blue-500 hover:text-white cursor-pointer"
          >
            <i :class="route.icon + ' mr-2'"></i>
            {{ route.name }}
          </div>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const windowWidth = ref(window.innerWidth);
const { isSidebarOpen, closeSidebar } = defineProps<{
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}>();

const router = useRouter();

const routes = [
  { name: "Dashboard", path: "/", icon: "fas fa-tachometer-alt" },
  { name: "Users", path: "/users", icon: "fas fa-users" },
  { name: "Artists", path: "/artists", icon: "fas fa-user" },
  { name: "Music", path: "/musics", icon: "fas fa-music" },
];

const navigateTo = (path: string) => {
  router.push(path);
  closeSidebar();
};

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
