<template>
  <div class="fixed inset-0 flex flex-col items-center justify-center bg-white">
    <h1 class="text-3xl font-bold text-indigo-700 mb-6">Artist Management</h1>

    <div class="flex space-x-1 h-4">
      <span
        v-for="(bar, index) in 5"
        :key="index"
        class="bar"
        :style="{ animationDelay: `${index * 0.1}s` }"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
@keyframes wave {
  0%,
  100% {
    height: 1rem;
  }
  25% {
    height: 2rem;
  }
  50% {
    height: 3rem;
  }
  75% {
    height: 2rem;
  }
}

@keyframes colorFade {
  0%,
  100% {
    background-color: rgba(76, 81, 191, 0.2);
  }
  50% {
    background-color: rgba(76, 81, 191, 1);
  }
}

.bar {
  display: inline-block;
  width: 0.5rem;
  height: 1rem;
  background-color: rgba(76, 81, 191, 0.2);
  animation: wave 1.2s infinite ease-in-out, colorFade 1.2s infinite ease-in-out;
  border-radius: 0.25rem;
}
</style>
