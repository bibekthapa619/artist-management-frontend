<template>
  <div class="flex flex-wrap -mx-3">
    <div
      v-for="(music, index) in musics"
      :key="music.id"
      class="w-full sm:w-1/2 md:w-1/3 px-3 mb-6"
    >
      <div
        class="bg-white shadow-lg rounded p-6 transition-transform transform hover:scale-105 relative border border-gray-200"
      >
        <div
          class="flex justify-between items-center mb-4"
          v-if="options && options.length > 0"
        >
          <div class="absolute top-4 right-4" :id="`card-options-${music.id}`">
            <button
              @click="() => toggleOptions(music.id as number)"
              class="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <i class="fas fa-cog fa-lg"></i>
            </button>
            <div
              v-if="selectedId === music.id"
              class="absolute right-0 w-48 mt-1 bg-white shadow-lg rounded z-10 border border-gray-200"
            >
              <TableOptions :options="options" :argument="music"></TableOptions>
            </div>
          </div>
        </div>

        <!-- Content Section with Large Icon -->
        <div class="flex items-start">
          <!-- Left Side: Large Music Icon -->
          <div
            class="mr-4 text-gray-600 flex items-center justify-center h-100"
          >
            <i class="fas fa-compact-disc text-5xl"></i>
          </div>

          <!-- Right Side: Title, Genre, Album -->
          <div>
            <h2 class="text-2xl font-bold mb-2 text-gray-900">
              {{ music.title }}
            </h2>
            <p class="text-gray-600 text-sm italic font-v">
              Genre: {{ music.genre }}
            </p>
            <p class="text-gray-600 text-sm italic">
              Album: {{ music.album_name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, onBeforeUnmount, onMounted, ref, type Ref } from "vue";
import type { Music } from "@/types/api/common";
import TableOptions from "@/components/table/TableOptions.vue";
import type { TableOption } from "@/components/table/table";

const { musics, options } = defineProps<{
  musics: Music[];
  options?: TableOption[];
}>();

const selectedId: Ref<number | null> = ref(null);
const dropdownRef = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (selectedId.value) {
    const id = `card-options-${selectedId.value}`;
    dropdownRef.value = document.getElementById(id);

    if (dropdownRef.value && !dropdownRef.value.contains(target)) {
      selectedId.value = null;
    }
  }
};

const toggleOptions = (id: number) => {
  if (!selectedId.value || selectedId.value !== id) {
    selectedId.value = id;
    return;
  }

  selectedId.value = null;
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
