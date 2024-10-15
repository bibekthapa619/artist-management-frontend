<template>
  <div class="">
    <nav class="text-sm mb-4">
      <router-link to="/musics" class="text-primary hover:underline"
        >Musics</router-link
      >
      <span class="mx-2">/</span>
      <span>Create</span>
    </nav>
    <h1 class="text-2xl font-bold mb-4">Music Details</h1>
    <div class="bg-white shadow-md rounded p-6">
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
            type="submit"
            class="bg-indigo-700 text-white font-bold py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-800"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Music } from "@/types/api/common";
import { reactive, ref } from "vue";

const music = reactive<Music>({
  title: "",
  album_name: "",
  genre: "",
});

const errors = reactive<Partial<Record<keyof Music, string>>>({});
const loading = ref<boolean>(false);

const validate = () => {
  errors.title = music.title ? "" : "Title is required";
  errors.album_name = music.album_name ? "" : "Album name is required";
  errors.genre = music.genre ? "" : "Genre is required";

  return !errors.title && !errors.album_name && !errors.genre;
};

const handleSubmit = () => {
  if (!validate()) {
    return;
  }
};
</script>
