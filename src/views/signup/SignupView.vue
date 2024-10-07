<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-semibold text-center mb-6">Signup</h2>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label
            for="first_name"
            class="block text-sm font-medium text-gray-700"
            >First Name</label
          >
          <input
            id="first_name"
            v-model="signupData.first_name"
            type="text"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            required
          />
          <p v-if="fieldErrors.first_name" class="text-red-500 text-sm">
            {{ fieldErrors.first_name }}
          </p>
        </div>

        <div class="mb-4">
          <label for="last_name" class="block text-sm font-medium text-gray-700"
            >Last Name</label
          >
          <input
            id="last_name"
            v-model="signupData.last_name"
            type="text"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            required
          />
          <p v-if="fieldErrors.last_name" class="text-red-500 text-sm">
            {{ fieldErrors.last_name }}
          </p>
        </div>

        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            id="email"
            v-model="signupData.email"
            type="email"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            required
          />
          <p v-if="fieldErrors.email" class="text-red-500 text-sm">
            {{ fieldErrors.email }}
          </p>
        </div>

        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            id="password"
            v-model="signupData.password"
            type="password"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            required
          />
          <p v-if="fieldErrors.password" class="text-red-500 text-sm">
            {{ fieldErrors.password }}
          </p>
        </div>

        <div class="text-center">
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition duration-200 ease-in-out"
            :disabled="isLoading"
          >
            <span
              v-if="isLoading"
              class="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
              role="status"
              aria-hidden="true"
            ></span>
            <span v-if="!isLoading">Signup</span>
            <span v-if="isLoading">Loading...</span>
          </button>
        </div>

        <div class="mt-4 text-center underline">
          <router-link to="/login" class="text-blue-600 hover:text-blue-800"
            >Already have an account? Login</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { signup } from "@/api/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { AxiosError } from "axios";

const signupData = ref({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
});

const fieldErrors = ref({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
});
const isLoading = ref(false);

const router = useRouter();

const handleSubmit = async () => {
  fieldErrors.value = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  if (!signupData.value.first_name) {
    fieldErrors.value.first_name = "First name is required.";
  }
  if (!signupData.value.last_name) {
    fieldErrors.value.last_name = "Last name is required.";
  }
  if (!signupData.value.email) {
    fieldErrors.value.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.value.email)) {
    fieldErrors.value.email = "Invalid email format.";
  }
  if (!signupData.value.password) {
    fieldErrors.value.password = "Password is required.";
  } else if (signupData.value.password.length < 6) {
    fieldErrors.value.password = "Password must be at least 6 characters.";
  }

  if (
    fieldErrors.value.first_name ||
    fieldErrors.value.last_name ||
    fieldErrors.value.email ||
    fieldErrors.value.password
  ) {
    return;
  }
  isLoading.value = true;
  try {
    const res = await signup(signupData.value);
    router.push({ name: "login" });
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const errors = error.response.data.errors || {};
      fieldErrors.value.first_name = errors.first_name?.[0] || "";
      fieldErrors.value.last_name = errors.last_name?.[0] || "";
      fieldErrors.value.email = errors.email?.[0] || "";
      fieldErrors.value.password = errors.password?.[0] || "";
    }
  } finally {
    isLoading.value = false;
  }
};
</script>
