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
        </div>

        <div class="text-center">
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition duration-200 ease-in-out"
          >
            Signup
          </button>
        </div>

        <div class="mt-4 text-center underline">
          <router-link to="/login" class="text-blue-600 hover:text-blue-800"
            >Already have an account? Login</router-link
          >
        </div>
      </form>

      <div v-if="errorMessage" class="mt-4 text-red-500 text-center">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const signupData = ref({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
});
const errorMessage = ref("");

const handleSubmit = () => {
  errorMessage.value = "";

  if (
    !signupData.value.first_name ||
    !signupData.value.last_name ||
    !signupData.value.email ||
    !signupData.value.password
  ) {
    errorMessage.value = "All fields are required.";
    return;
  }

  console.log("Signing up with", signupData.value);
};
</script>
