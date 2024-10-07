<template>
  <div class="">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
      <h1 class="text-3xl font-bold text-center mb-4">
        Welcome to the Artist Management System
      </h1>
      <p class="text-lg text-gray-600 mb-6 text-center">
        Hello, {{ user?.firstName }}! We're glad to have you here. Manage your
        artists efficiently and keep track of all their information in one
        place.
      </p>
      <div class="text-center">
        <button
          @click="handleLogout"
          class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import { useUserStore } from "@/store/userStore";
import { storeToRefs } from "pinia";
import { clearCookie } from "@/lib/cookies/cookies";
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();

const userStore = useUserStore();

const { user, isLoggedIn } = storeToRefs(userStore);

const handleLogout = () => {
  userStore.clearUser();
  clearCookie("token");
  router.push("/login");
};
</script>
