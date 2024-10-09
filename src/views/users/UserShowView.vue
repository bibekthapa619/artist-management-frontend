<template>
  <div class="">
    <nav class="text-sm mb-4">
      <router-link to="/users" class="text-indigo-600 hover:underline"
        >Users</router-link
      >
      <span class="mx-2">/</span>
      <span>Details</span>
    </nav>
    <h1 class="text-2xl font-bold mb-4">User Details</h1>

    <div class="bg-white shadow-md rounded p-6">
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-4">User Details</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="mb-4">
            <label
              for="first_name"
              class="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <div class="mt-1 block w-full p-2 border rounded bg-gray-100">
              {{ userDetails.first_name }}
            </div>
          </div>

          <div class="mb-4">
            <label
              for="last_name"
              class="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <div class="mt-1 block w-full p-2 border rounded bg-gray-100">
              {{ userDetails.last_name }}
            </div>
          </div>

          <div class="mb-4">
            <label for="dob" class="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <div class="mt-1 block w-full p-2 border rounded bg-gray-100">
              {{ userDetails.dob }}
            </div>
          </div>

          <div class="mb-4">
            <label for="gender" class="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <div class="mt-1 block w-full p-2 border rounded bg-gray-100">
              {{ userDetails.gender }}
            </div>
          </div>

          <div class="mb-4">
            <label
              for="address"
              class="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <div class="mt-1 block w-full p-2 border rounded bg-gray-100">
              {{ userDetails.address }}
            </div>
          </div>

          <div class="mb-4">
            <label for="phone" class="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <div class="mt-1 block w-full p-2 border rounded bg-gray-100">
              {{ userDetails.phone }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="userDetails.role === 'artist'" class="mt-6">
        <h2 class="text-xl font-semibold mb-4">Artist Details</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="mb-4">
            <label
              for="artist_name"
              class="block text-sm font-medium text-gray-700"
            >
              Artist Name
            </label>
            <div class="mt-1 block w-full p-2 border rounded bg-gray-100">
              {{ artistDetails.name }}
            </div>
          </div>

          <div class="mb-4">
            <label
              for="first_release_year"
              class="block text-sm font-medium text-gray-700"
            >
              First Release Year
            </label>
            <div class="mt-1 block w-full p-2 border rounded bg-gray-100">
              {{ artistDetails.first_release_year }}
            </div>
          </div>

          <div class="mb-4">
            <label
              for="no_of_albums_released"
              class="block text-sm font-medium text-gray-700"
            >
              Number of Albums Released
            </label>
            <div class="mt-1 block w-full p-2 border rounded bg-gray-100">
              {{ artistDetails.no_of_albums_released }}
            </div>
          </div>
        </div>
      </div>

      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-4">Login Details</h2>

        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div class="mt-1 block w-full p-2 border rounded bg-gray-100">
            {{ userDetails.email }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getUserById } from "@/api/users";
import type { ArtistFields, UserFields } from "@/types/api/users";

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
    const res = await getUserById(userId as string);
    userDetails.value = res.data.user;
    if (res.data.user.role === "artist") {
      artistDetails.value = res.data.artist;
    }
  } catch (error) {
    console.error(error);
  }
});
</script>
