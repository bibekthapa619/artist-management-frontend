<template>
  <div class="">
    <nav class="text-sm mb-4">
      <router-link to="/artists" class="text-indigo-600 hover:underline"
        >Artists</router-link
      >
      <span class="mx-2">/</span>
      <span>Details</span>
    </nav>
    <h1 class="text-2xl font-bold mb-4">Artist Details</h1>

    <UserDetails
      :userDetails="userDetails"
      :artistDetails="artistDetails"
    ></UserDetails>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import type { ArtistFields, UserFields } from "@/types/api/users";
import UserDetails from "@/components/userDetails/UserDetails.vue";
import { getArtistById } from "@/api/artists";

const userDetails = ref<UserFields>({
  id: 0,
  first_name: "",
  last_name: "",
  dob: "",
  gender: "",
  address: "",
  phone: "",
  email: "",
  role: "",
});

const artistDetails = ref<ArtistFields>({
  id: 0,
  name: "",
  first_release_year: undefined,
  no_of_albums_released: undefined,
});

const route = useRoute();
const userId: string | string[] = route.params.id;

onMounted(async () => {
  try {
    const res = await getArtistById(userId as string);
    userDetails.value = res.data.user;
    artistDetails.value = res.data.artist;
  } catch (error) {
    console.error(error);
  }
});
</script>
