<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
    <div class="bg-white p-8 rounded shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-semibold text-center mb-6">Login</h2>

      <form @submit.prevent="handleSubmit">
        <div class="">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            id="email"
            v-model="email"
            type="email"
            class="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div class="mt-4">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            id="password"
            v-model="password"
            type="password"
            class="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div v-if="errorMessage" class="mt-2 text-red-500 text-center">
          {{ errorMessage }}
        </div>
        <div class="text-center mt-4">
          <button
            type="submit"
            class="w-full bg-indigo-700 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition duration-200 ease-in-out"
            :disabled="isLoading"
          >
            <span
              v-if="isLoading"
              class="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
              role="status"
              aria-hidden="true"
            ></span>
            <span v-if="!isLoading">Login</span>
            <span v-if="isLoading">Loading...</span>
          </button>
        </div>

        <div class="mt-4 text-center underline">
          <router-link to="/signup" class="text-indigo-700 hover:text-blue-800"
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
import { AxiosError } from "axios";
import type { LoginApiResponseSuccess } from "@/types/api/auth";

const email = ref<string>("");
const password = ref<string>("");
const errorMessage = ref<string>("");
const isLoading = ref<boolean>(false);
const userStore = useUserStore();
const router = useRouter();

const handleSubmit = async (): Promise<void> => {
  errorMessage.value = "";
  if (!email.value || !password.value) {
    errorMessage.value = "Email and Password are required.";
    return;
  }
  isLoading.value = true;

  try {
    const res: LoginApiResponseSuccess = await login(
      email.value,
      password.value
    );

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
    if (error instanceof AxiosError && error.response) {
      errorMessage.value = error?.response?.data?.message;
    }
  } finally {
    isLoading.value = false;
  }
};
</script>
