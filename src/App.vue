<template>
  <router-view />
</template>

<script setup lang="ts">
import { ref } from "vue";

const loading = ref(true);
</script>

<style scoped>
/* Example loading screen styles */
.loading-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5em;
}
</style>
