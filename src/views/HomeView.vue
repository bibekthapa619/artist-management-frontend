<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
      <h1 class="text-3xl font-bold text-center mb-4">
        Welcome to the Artist Management System
      </h1>
      <p class="text-lg text-gray-600 mb-6 text-center">
        Hello, {{ a }}! We're glad to have you here. Manage your artists
        efficiently and keep track of all their information in one place.
      </p>
      <div class="text-center">
        <router-link to="/artists">
          <button
            class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Go to Dashboard
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useUserStore } from "@/store/userStore";
import { storeToRefs } from "pinia";

const userStore = useUserStore();

const { user, isLoggedIn } = storeToRefs(userStore);
const a = ref(user?.value?.email);
</script>
