<template>
  <div
    class="flex flex-col items-center justify-center h-screen bg-gray-100 absolute top-0 left-0 w-screen"
  >
    <h1 class="text-6xl font-bold text-primary">404</h1>
    <p class="mt-4 text-xl text-gray-700">
      Oops! The page you're looking for doesn't exist.
    </p>
    <p class="mt-2 text-gray-500">
      It might have been removed or you may have entered the wrong URL.
    </p>

    <router-link
      to="/"
      class="mt-6 inline-block px-4 py-2 bg-primary text-white rounded shadow hover:bg-primary transition duration-300"
    >
      Go Home
    </router-link>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped></style>
