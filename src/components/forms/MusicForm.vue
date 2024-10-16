<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <label for="title" class="block text-gray-700 font-medium mb-2"
        >Title</label
      >
      <input
        type="text"
        id="title"
        v-model="music.title"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        :class="{ 'border-red-500': errors.title }"
        placeholder="Enter song title"
      />
      <p v-if="errors.title" class="text-red-500 text-sm mt-1">
        {{ errors.title }}
      </p>
    </div>

    <div>
      <label for="album" class="block text-gray-700 font-medium mb-2"
        >Album</label
      >
      <input
        type="text"
        id="album"
        v-model="music.album_name"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        :class="{ 'border-red-500': errors.album_name }"
        placeholder="Enter album name"
      />
      <p v-if="errors.album_name" class="text-red-500 text-sm mt-1">
        {{ errors.album_name }}
      </p>
    </div>

    <div>
      <label for="genre" class="block text-gray-700 font-medium mb-2"
        >Genre</label
      >
      <select
        id="genre"
        v-model="music.genre"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        :class="{ 'border-red-500': errors.genre }"
      >
        <option disabled value="">Select genre</option>
        <option value="rnb">RnB</option>
        <option value="country">Country</option>
        <option value="classic">Classic</option>
        <option value="rock">Rock</option>
        <option value="jazz">Jazz</option>
      </select>
      <p v-if="errors.genre" class="text-red-500 text-sm mt-1">
        {{ errors.genre }}
      </p>
    </div>

    <div>
      <button
        :disabled="loading"
        type="submit"
        class="bg-indigo-700 text-white font-bold py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-800"
      >
        <span v-if="loading">Saving...</span>
        <span v-else>Save</span>
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import type { Music } from "@/types/api/common";
import { defineProps, defineEmits, type Ref } from "vue";

const props = defineProps<{
  music: Music;
  errors: { [key: string]: string };
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: "submit"): void;
}>();

const handleSubmit = () => {
  emit("submit");
};
</script>
