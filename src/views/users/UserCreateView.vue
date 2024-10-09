<template>
  <div class="">
    <nav class="text-sm mb-4">
      <router-link to="/users" class="text-indigo-600 hover:underline"
        >Users</router-link
      >
      <span class="mx-2">/</span>
      <span>Create</span>
    </nav>
    <h1 class="text-2xl font-bold mb-4">Create User</h1>

    <div class="bg-white shadow-md rounded p-6">
      <UserForm
        :userDetails="userDetails"
        :artistDetails="artistDetails"
        :submitForm="submitForm"
        :errors="errors"
        :loading="loading"
        :formType="'create'"
      ></UserForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createArtist } from "@/api/artists";
import { createUser } from "@/api/users";
import type { ArtistFields, UserFields } from "@/types/api/users";
import { AxiosError } from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import UserForm from "@/components/forms/UserForm.vue";

const userDetails = ref<UserFields>({
  first_name: "",
  last_name: "",
  dob: "",
  gender: "",
  address: "",
  phone: "",
  role: "",
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
    if (userDetails.value.role === "artist_manager") {
      await createUser({
        user: userDetails.value,
      });
    } else if (userDetails.value.role === "artist") {
      await createArtist({
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
        role: fieldErrors?.role?.[0] || "",
        email: fieldErrors?.email?.[0] || "",
        password: fieldErrors?.password?.[0] || "",

        artist_name: fieldErrors?.name?.[0] || "",
        first_release_year: fieldErrors?.first_release_year?.[0] || "",
        no_of_albums_released: fieldErrors?.no_of_albums_released?.[0] || "",
      };
    }
  } finally {
    loading.value = false;
  }
};
</script>
