<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    <div
      v-for="(artist, index) in artists"
      :key="artist.id"
      class="bg-white shadow-lg rounded p-6 transition-transform transform hover:scale-105 relative border border-gray-200"
    >
      <div
        class="flex justify-between items-center mb-4"
        v-if="options && options.length > 0"
      >
        <div class="absolute top-4 right-4" :id="`card-options-${artist.id}`">
          <button
            @click="() => toggleOptions(artist.id as number)"
            class="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <i class="fas fa-cog fa-lg"></i>
          </button>
          <div
            v-if="selectedId === artist.id"
            class="absolute right-0 w-48 mt-1 bg-white shadow-lg rounded z-10 border border-gray-200"
          >
            <TableOptions :options="options" :argument="artist"></TableOptions>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <h2 class="text-xl font-bold mb-2 text-gray-900">
          {{ artist.name }}
        </h2>
        <p class="text-gray-600 text-sm italic">
          {{ "Artist" }}
        </p>
      </div>

      <div class="mb-2 flex items-center">
        <span class="text-gray-800 font-semibold"
          >Albums: {{ artist.no_of_albums_released }}</span
        >
      </div>
      <div class="mb-2 flex items-center">
        <span class="text-gray-800 font-semibold"
          >First Release: {{ artist.first_release_year }}</span
        >
      </div>
      <div class="mb-2 flex items-center">
        <span class="text-gray-800 font-semibold"
          >Music: {{ artist.music_count }}</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, onBeforeUnmount, onMounted, ref, type Ref } from "vue";
import type { Artist } from "@/types/api/common";
import TableOptions from "@/components/table/TableOptions.vue";
import type { TableOption } from "@/components/table/table";

const { artists, options } = defineProps<{
  artists: Artist[];
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

<style scoped>
/* Additional styles for enhancement */
.card {
  transition: box-shadow 0.3s, transform 0.3s;
}
.card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
</style>
