<template>
  <input
    type="text"
    v-model="searchQuery"
    @input="debouncedSearch"
    placeholder="Search users..."
    class="border rounded p-2 mb-4"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";

const emit = defineEmits(["update:searchQuery"]);

const searchQuery = ref<string>("");

const debounce = (func: Function, delay: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: any[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const debouncedSearch = debounce(() => {
  emit("update:searchQuery", searchQuery.value);
}, 300);
</script>
