<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-semibold text-center mb-6">Login</h2>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            id="email"
            v-model="email"
            type="email"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            id="password"
            v-model="password"
            type="password"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div v-if="errorMessage" class="mt-4 text-red-500 text-center">
          {{ errorMessage }}
        </div>
        <div class="text-center">
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition duration-200 ease-in-out"
          >
            Login
          </button>
        </div>

        <div class="mt-4 text-center underline">
          <router-link to="/signup" class="text-blue-600 hover:text-blue-800"
            >Don't have an account? Signup</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { login } from "@/api/auth";
import { useUserStore } from "@/store/userStore";
import { setCookie } from "@/lib/cookies/cookies";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const userStore = useUserStore();
const router = useRouter();

const handleSubmit = async () => {
  errorMessage.value = "";

  if (!email.value || !password.value) {
    errorMessage.value = "Email and Password are required.";
    return;
  }

  try {
    const res = await login(email.value, password.value);

    userStore.setUser({
      email: res.data.user.email,
      id: res.data.user.id,
      firstName: res.data.user.first_name,
      lastName: res.data.user.last_name,
      role: res.data.user.role,
    });
    setCookie("token", res.data.token);

    router.push({ name: "home" });
  } catch (error) {
    console.log(error);
    errorMessage.value = error?.response?.data?.message;
  }
};
</script>
