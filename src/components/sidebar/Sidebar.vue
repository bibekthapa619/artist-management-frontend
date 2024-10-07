<template>
  <aside
    class="h-screen bg-white w-64 shadow-lg md:block transition-transform duration-300 ease-in-out"
    :class="{
      absolute: windowWidth < 1024,
      'translate-x-0': isSidebarOpen,
      '-translate-x-64': !isSidebarOpen && windowWidth < 1024,
    }"
  >
    <div class="">
      <div class="flex justify-between items-center">
        <h2 class="text-xl text-indigo-700 font-semibold p-4">
          Artist Management
        </h2>
        <button
          @click="closeSidebar"
          class="fixed right-0 p-4 text-gray-600 hover:text-gray-900 lg:hidden"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      <ul class="mt-4">
        <li v-for="(route, index) in routes" :key="index">
          <div
            @click="navigateTo(route.path)"
            class="block px-4 py-2 text-gray-600 hover:bg-indigo-700 hover:text-white cursor-pointer"
            v-if="user && route.roles && route.roles.includes(user.role)"
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
import { useUserStore } from "@/store/userStore";
import type { User } from "@/types/common/common";
import { storeToRefs } from "pinia";
import { onBeforeUnmount, onMounted, ref, type Ref } from "vue";
import { useRouter } from "vue-router";

const windowWidth = ref(window.innerWidth);
const { isSidebarOpen, closeSidebar } = defineProps<{
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}>();

const userStore = useUserStore();
const { user } = storeToRefs(userStore) as { user: Ref<User> };
const router = useRouter();

const routes = [
  {
    name: "Dashboard",
    path: "/",
    icon: "fas fa-tachometer-alt",
    roles: ["super_admin", "artist_manager", "artist"],
  },
  {
    name: "Users",
    path: "/users",
    icon: "fas fa-users",
    roles: ["super_admin"],
  },
  {
    name: "Artists",
    path: "/artists",
    icon: "fas fa-user",
    roles: ["super_admin", "artist_manager"],
  },
  {
    name: "Music",
    path: "/musics",
    icon: "fas fa-music",
    roles: ["artist"],
  },
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
