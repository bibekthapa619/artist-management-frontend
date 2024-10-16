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
      <MusicForm
        :errors="errors"
        :music="music"
        :loading="loading"
        v-on:submit="handleSubmit"
      ></MusicForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createMusic, getMusicById, updateMusic } from "@/api/musics";
import MusicForm from "@/components/forms/MusicForm.vue";
import { useAxiosErrorHandler } from "@/lib/errorHandler/axiosErrorHandler";
import { notifySuccess } from "@/main";
import type { Music } from "@/types/api/common";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const music = reactive<Music>({
  title: "",
  album_name: "",
  genre: "",
});

const errors = reactive<{ [key: string]: string }>({});
const loading = ref<boolean>(false);
const { handleError } = useAxiosErrorHandler();
const router = useRouter();
const route = useRoute();
const musicId: string = route.params.id as string;

const validate = () => {
  errors.title = music.title ? "" : "Title is required";
  errors.album_name = music.album_name ? "" : "Album name is required";
  errors.genre = music.genre ? "" : "Genre is required";

  return !errors.title && !errors.album_name && !errors.genre;
};

const handleSubmit = async () => {
  if (!validate()) {
    return;
  }
  try {
    loading.value = true;
    let res = await updateMusic(musicId, music);
    notifySuccess(res.data.message);
    router.push({
      name: "musics.index",
    });
  } catch (error) {
    handleError(error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  loading.value = true;
  try {
    const res = await getMusicById(musicId as string);
    Object.assign(music, res.data.music);
  } catch (error) {
    handleError(error);
  } finally {
    loading.value = false;
  }
});
</script>
