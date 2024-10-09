<template>
  <div class="">
    <nav class="text-sm mb-4">
      <router-link to="/artists" class="text-primary hover:underline"
        >Artists</router-link
      >
      <span class="mx-2">/</span>
      <span>Create</span>
    </nav>
    <h1 class="text-2xl font-bold mb-4">Create Artist</h1>

    <div class="bg-white shadow-md rounded p-6">
      <UserForm
        :userDetails="userDetails"
        :artistDetails="artistDetails"
        :submitForm="submitForm"
        :errors="errors"
        :loading="loading"
        :formActionType="'create'"
        :formType="'artist'"
      ></UserForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createArtist } from "@/api/artists";
import type { ArtistFields, UserFields } from "@/types/api/users";
import { ref } from "vue";
import { useRouter } from "vue-router";
import UserForm from "@/components/forms/UserForm.vue";
import { useAxiosErrorHandler } from "@/lib/errorHandler/axiosErrorHandler";

const userDetails = ref<UserFields>({
  first_name: "",
  last_name: "",
  dob: "",
  gender: "",
  address: "",
  phone: "",
  role: "artist",
  email: "",
  password: "",
});

const artistDetails = ref<ArtistFields>({
  name: "",
  first_release_year: undefined,
  no_of_albums_released: undefined,
});

const errors = ref<{ [key: string]: string }>({});
const loading = ref(false);
const router = useRouter();
const { handleError } = useAxiosErrorHandler(errors);

function validateField(field: keyof UserFields | keyof ArtistFields) {
  errors.value = {};
  const value =
    field in userDetails.value
      ? userDetails.value[field as keyof UserFields]
      : artistDetails.value[field as keyof ArtistFields];

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

  if (userDetails.value.role === "artist") {
    for (const key in artistDetails.value) {
      validateField(key as keyof ArtistFields);
    }
  }

  if (Object.keys(errors.value).length > 0) {
    return;
  }

  loading.value = true;
  try {
    await createArtist({
      user: userDetails.value,
      artist: artistDetails.value,
    });
    router.push("/artists");
  } catch (error) {
    handleError(error);
  } finally {
    loading.value = false;
  }
};
</script>
