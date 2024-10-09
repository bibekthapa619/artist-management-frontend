<template>
  <div class="">
    <nav class="text-sm mb-4">
      <router-link to="/users" class="text-indigo-600 hover:underline"
        >Artists</router-link
      >
      <span class="mx-2">/</span>
      <span>Edit</span>
    </nav>
    <h1 class="text-2xl font-bold mb-4">Edit Artist</h1>

    <div class="bg-white shadow-md rounded p-6">
      <UserForm
        :userDetails="userDetails"
        :artistDetails="artistDetails"
        :submitForm="submitForm"
        :errors="errors"
        :loading="loading"
        :formType="'artist'"
        :formActionType="'edit'"
      ></UserForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { ArtistFields, UserFields } from "@/types/api/users";
import { AxiosError } from "axios";
import { getArtistById, updateArtist } from "@/api/artists";
import UserForm from "@/components/forms/UserForm.vue";

const userDetails = ref<UserFields>({
  id: 0,
  first_name: "",
  last_name: "",
  dob: "",
  gender: "",
  address: "",
  phone: "",
  email: "",
  role: "artist",
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
    const res = await getArtistById(userId as string);
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
    await updateArtist(artistDetails.value.id as number, {
      user: userDetails.value,
      artist: artistDetails.value,
    });
    router.push("/artists");
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
