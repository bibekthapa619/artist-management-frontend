<template>
  <div class="relative" ref="dropdownRef">
    <button
      @click="toggleSortOptions"
      class="bg-white text-gray-700 font-medium px-4 py-2 rounded-sm whitespace-nowrap flex items-center space-x-2 hover:bg-gray-200"
    >
      <span>Sort </span>
      <i class="fas fa-chevron-down text-sm"></i>
    </button>

    <div
      v-if="showSortOptions"
      class="absolute z-10 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg p-2"
    >
      <div
        v-for="option in options"
        :key="option.value"
        class="cursor-pointer hover:bg-gray-200"
        @click="selectSort(option.value)"
      >
        <label>
          <input type="radio" :value="option.value" v-model="selectedSort" />
          {{ option.label }}
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, onMounted, onBeforeUnmount } from "vue";

const { options, modelValue } = defineProps<{
  options: { value: string; label: string }[];
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const showSortOptions = ref(false);
const selectedSort = ref(modelValue);
const dropdownRef = ref<HTMLElement | null>(null);

const toggleSortOptions = () => {
  showSortOptions.value = !showSortOptions.value;
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    showSortOptions.value = false;
  }
};

const selectSort = (value: string) => {
  selectedSort.value = value;
  emit("update:modelValue", value);
  showSortOptions.value = false;
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped></style>
