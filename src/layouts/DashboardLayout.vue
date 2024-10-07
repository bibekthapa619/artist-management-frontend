<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar :isSidebarOpen="isSidebarOpen" :closeSidebar="closeSidebar" />
    <div class="flex-1 flex flex-col">
      <Navbar :toggleSidebar="toggleSidebar" />
      <main class="flex-1 p-6 overflow-y-auto">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "@/components/sidebar/Sidebar.vue";
import Navbar from "@/components/navbar/Navbar.vue";
import { ref } from "vue";

const isSidebarOpen = ref(false);

const toggleSidebar = (): void => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = (): void => {
  isSidebarOpen.value = false;
};
</script>
