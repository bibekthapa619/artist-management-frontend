<template>
  <div class="">
    <nav class="text-sm mb-4">
      <router-link to="/users" class="text-indigo-600 hover:underline"
        >Users</router-link
      >
      <span class="mx-2">/</span>
      <span>Edit</span>
    </nav>
    <h1 class="text-2xl font-bold mb-4">Edit User</h1>

    <div class="bg-white shadow-md rounded-lg p-6">
      <form @submit.prevent="submitForm">
        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-4">User Details</h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="mb-4">
              <label
                for="first_name"
                class="block text-sm font-medium text-gray-700"
              >
                First Name <span class="text-red-500">*</span>
              </label>
              <input
                id="first_name"
                v-model="userDetails.first_name"
                type="text"
                class="mt-1 block w-full p-2 border rounded-md"
                :class="{ 'border-red-500': errors.first_name }"
                required
              />
              <span v-if="errors.first_name" class="text-red-500 text-xs">{{
                errors.first_name
              }}</span>
            </div>

            <div class="mb-4">
              <label
                for="last_name"
                class="block text-sm font-medium text-gray-700"
              >
                Last Name <span class="text-red-500">*</span>
              </label>
              <input
                id="last_name"
                v-model="userDetails.last_name"
                type="text"
                class="mt-1 block w-full p-2 border rounded-md"
                :class="{ 'border-red-500': errors.last_name }"
                required
              />
              <span v-if="errors.last_name" class="text-red-500 text-xs">{{
                errors.last_name
              }}</span>
            </div>

            <div class="mb-4">
              <label for="dob" class="block text-sm font-medium text-gray-700">
                Date of Birth <span class="text-red-500">*</span>
              </label>
              <input
                id="dob"
                v-model="userDetails.dob"
                type="date"
                class="mt-1 block w-full p-2 border rounded-md"
                :class="{ 'border-red-500': errors.dob }"
                required
              />
              <span v-if="errors.dob" class="text-red-500 text-xs">{{
                errors.dob
              }}</span>
            </div>

            <div class="mb-4">
              <label
                for="gender"
                class="block text-sm font-medium text-gray-700"
                >Gender <span class="text-red-500">*</span></label
              >
              <select
                v-model="userDetails.gender"
                class="mt-1 block w-full p-2 border rounded-md"
                :class="{ 'border-red-500': errors.gender }"
                required
              >
                <option value="" disabled>Select a gender</option>
                <option value="m">Male</option>
                <option value="f">Female</option>
                <option value="o">Other</option>
              </select>
              <span v-if="errors.gender" class="text-red-500 text-xs">{{
                errors.gender
              }}</span>
            </div>

            <div class="mb-4">
              <label
                for="address"
                class="block text-sm font-medium text-gray-700"
              >
                Address <span class="text-red-500">*</span>
              </label>
              <input
                id="address"
                v-model="userDetails.address"
                type="text"
                class="mt-1 block w-full p-2 border rounded-md"
                :class="{ 'border-red-500': errors.address }"
                required
              />
              <span v-if="errors.address" class="text-red-500 text-xs">{{
                errors.address
              }}</span>
            </div>

            <div class="mb-4">
              <label
                for="phone"
                class="block text-sm font-medium text-gray-700"
              >
                Phone <span class="text-red-500">*</span>
              </label>
              <input
                id="phone"
                v-model="userDetails.phone"
                type="tel"
                class="mt-1 block w-full p-2 border rounded-md"
                :class="{ 'border-red-500': errors.phone }"
                required
              />
              <span v-if="errors.phone" class="text-red-500 text-xs">{{
                errors.phone
              }}</span>
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
                >Artist Name <span class="text-red-500">*</span></label
              >
              <input
                id="artist_name"
                v-model="artistDetails.name"
                type="text"
                class="mt-1 block w-full p-2 border rounded-md"
                :class="{ 'border-red-500': errors.name }"
                required
              />
              <span v-if="errors.name" class="text-red-500 text-xs">{{
                errors.name
              }}</span>
            </div>

            <div class="mb-4">
              <label
                for="first_release_year"
                class="block text-sm font-medium text-gray-700"
                >First Release Year <span class="text-red-500">*</span></label
              >
              <input
                id="first_release_year"
                v-model="artistDetails.first_release_year"
                type="number"
                class="mt-1 block w-full p-2 border rounded-md"
                :class="{ 'border-red-500': errors.first_release_year }"
                required
              />
              <span
                v-if="errors.first_release_year"
                class="text-red-500 text-xs"
                >{{ errors.first_release_year }}</span
              >
            </div>

            <div class="mb-4">
              <label
                for="no_of_albums_released"
                class="block text-sm font-medium text-gray-700"
                >Number of Albums Released
                <span class="text-red-500">*</span></label
              >
              <input
                id="no_of_albums_released"
                v-model="artistDetails.no_of_albums_released"
                type="number"
                class="mt-1 block w-full p-2 border rounded-md"
                :class="{ 'border-red-500': errors.no_of_albums_released }"
                required
              />
              <span
                v-if="errors.no_of_albums_released"
                class="text-red-500 text-xs"
                >{{ errors.no_of_albums_released }}</span
              >
            </div>
          </div>
        </div>
        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-4">Login Details</h2>

          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email <span class="text-red-500">*</span>
            </label>
            <input
              id="email"
              v-model="userDetails.email"
              type="email"
              class="mt-1 block w-full p-2 border rounded-md"
              :class="{ 'border-red-500': errors.email }"
              required
            />
            <span v-if="errors.email" class="text-red-500 text-xs">{{
              errors.email
            }}</span>
          </div>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="bg-indigo-700 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-800 transition duration-300"
        >
          <span v-if="loading">Updating...</span>
          <span v-else>Save</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { updateUser, getUserById } from "@/api/users";
import type { ArtistFields, UserFields } from "@/types/api/users";
import { AxiosError } from "axios";
import { updateArtist } from "@/api/artists";

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
  loading.value = true;
  try {
    const res = await getUserById(userId as string);
    userDetails.value = res.data.user;
    if (res.data.user.role === "artist") {
      artistDetails.value = res.data.artist;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});

const errors = ref<{ [key: string]: string }>({});
const loading = ref(false);
const router = useRouter();

function validateField(field: keyof UserFields) {
  const value = userDetails.value[field];
  if (!value) {
    errors.value[field] = "This field is required.";
  } else {
    delete errors.value[field];
  }
}

const submitForm = async () => {
  for (const key in userDetails.value) {
    validateField(key as keyof UserFields);
  }

  if (Object.keys(errors.value).length > 0) {
    return;
  }

  loading.value = true;
  try {
    if (userDetails.value.role === "artist_manager") {
      await updateUser(userId as string, {
        user: userDetails.value,
      });
    } else {
      await updateArtist(artistDetails.value.id as number, {
        user: userDetails.value,
        artist: artistDetails.value,
      });
    }
    router.push("/users");
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError && error.response) {
      const fieldErrors = error.response.data.errors || {};

      errors.value = {
        first_name: fieldErrors?.first_name?.[0] || "",
        last_name: fieldErrors?.last_name?.[0] || "",
        dob: fieldErrors?.dob?.[0] || "",
        gender: fieldErrors?.gender?.[0] || "",
        address: fieldErrors?.address?.[0] || "",
        phone: fieldErrors?.phone?.[0] || "",
        email: fieldErrors?.email?.[0] || "",
      };
    }
  } finally {
    loading.value = false;
  }
};
</script>
