<template>
  <div class="">
    <nav class="text-sm mb-4">
      <router-link to="/users" class="text-primary hover:underline"
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
import { getArtistById, updateArtist } from "@/api/artists";
import UserForm from "@/components/forms/UserForm.vue";
import { useAxiosErrorHandler } from "@/lib/errorHandler/axiosErrorHandler";
import { notifySuccess } from "@/main";

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
const router = useRouter();

onMounted(async () => {
  loading.value = true;
  try {
    const res = await getArtistById(userId as string);
    userDetails.value = res.data.user;
    artistDetails.value = res.data.artist;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});

const errors = ref<{ [key: string]: string }>({});
const loading = ref(false);
const { handleError } = useAxiosErrorHandler(errors);

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
    let res = await updateArtist(artistDetails.value.id as number, {
      user: userDetails.value,
      artist: artistDetails.value,
    });
    notifySuccess(res.message);
    router.push("/artists");
  } catch (error) {
    handleError(error);
  } finally {
    loading.value = false;
  }
};
</script>
