<template>
  <form @submit.prevent="submitForm">
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-4">User Details</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="mb-4">
          <label
            for="first_name"
            class="block text-sm font-medium text-gray-700"
            >First Name <span class="text-red-500">*</span></label
          >
          <input
            id="first_name"
            v-model="userDetails.first_name"
            type="text"
            class="mt-1 block w-full p-2 border rounded"
            :class="{ 'border-red-500': errors.first_name }"
            required
          />
          <span v-if="errors.first_name" class="text-red-500 text-xs">{{
            errors.first_name
          }}</span>
        </div>
        <div class="mb-4">
          <label for="last_name" class="block text-sm font-medium text-gray-700"
            >Last Name <span class="text-red-500">*</span></label
          >
          <input
            id="last_name"
            v-model="userDetails.last_name"
            type="text"
            class="mt-1 block w-full p-2 border rounded"
            :class="{ 'border-red-500': errors.last_name }"
            required
          />
          <span v-if="errors.last_name" class="text-red-500 text-xs">{{
            errors.last_name
          }}</span>
        </div>

        <div class="mb-4">
          <label for="dob" class="block text-sm font-medium text-gray-700"
            >Date of Birth <span class="text-red-500">*</span></label
          >
          <input
            id="dob"
            v-model="userDetails.dob"
            type="date"
            class="mt-1 block w-full p-2 border rounded"
            :class="{ 'border-red-500': errors.dob }"
            required
          />
          <span v-if="errors.dob" class="text-red-500 text-xs">{{
            errors.dob
          }}</span>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700"
            >Gender <span class="text-red-500">*</span></label
          >
          <select
            v-model="userDetails.gender"
            class="mt-1 block w-full p-2 border rounded"
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
          <label for="address" class="block text-sm font-medium text-gray-700"
            >Address <span class="text-red-500">*</span></label
          >
          <input
            id="address"
            v-model="userDetails.address"
            type="text"
            class="mt-1 block w-full p-2 border rounded"
            :class="{ 'border-red-500': errors.address }"
            required
          />
          <span v-if="errors.address" class="text-red-500 text-xs">{{
            errors.address
          }}</span>
        </div>

        <div class="mb-4">
          <label for="phone" class="block text-sm font-medium text-gray-700"
            >Phone <span class="text-red-500">*</span></label
          >
          <input
            id="phone"
            v-model="userDetails.phone"
            type="tel"
            class="mt-1 block w-full p-2 border rounded"
            :class="{ 'border-red-500': errors.phone }"
            required
          />
          <span v-if="errors.phone" class="text-red-500 text-xs">{{
            errors.phone
          }}</span>
        </div>

        <div
          class="mb-4"
          v-if="formActionType === 'create' && formType === 'user'"
        >
          <label for="role" class="block text-sm font-medium text-gray-700"
            >Role <span class="text-red-500">*</span></label
          >
          <select
            id="role"
            v-model="userDetails.role"
            class="mt-1 block w-full p-2 border rounded"
            :class="{ 'border-red-500': errors.role }"
            required
          >
            <option value="" disabled>Select a role</option>
            <option value="artist_manager">Artist Manager</option>
            <option value="artist">Artist</option>
          </select>
          <span v-if="errors.role" class="text-red-500 text-xs">{{
            errors.role
          }}</span>
        </div>
      </div>

      <div
        v-if="userDetails.role === 'artist' || formType === 'artist'"
        class="mt-6"
      >
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
              class="mt-1 block w-full p-2 border rounded"
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
              class="mt-1 block w-full p-2 border rounded"
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
              class="mt-1 block w-full p-2 border rounded"
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
    </div>

    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-4">Login Details</h2>

      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700"
          >Email <span class="text-red-500">*</span></label
        >
        <input
          id="email"
          v-model="userDetails.email"
          type="email"
          class="mt-1 block w-full p-2 border rounded"
          :class="{ 'border-red-500': errors.email }"
          required
        />
        <span v-if="errors.email" class="text-red-500 text-xs">{{
          errors.email
        }}</span>
      </div>

      <div class="mb-4" v-if="formActionType === 'create'">
        <label for="password" class="block text-sm font-medium text-gray-700"
          >Password <span class="text-red-500">*</span></label
        >
        <input
          id="password"
          v-model="userDetails.password"
          type="password"
          class="mt-1 block w-full p-2 border rounded"
          :class="{ 'border-red-500': errors.password }"
          required
        />
        <span v-if="errors.password" class="text-red-500 text-xs">{{
          errors.password
        }}</span>
      </div>
    </div>

    <button
      type="submit"
      :disabled="loading"
      class="bg-primary text-white px-4 py-2 rounded shadow hover:bg-primary-hover transition duration-300"
    >
      <span v-if="loading">Creating...</span>
      <span v-else>Save</span>
    </button>
  </form>
</template>

<script lang="ts" setup>
import type { ArtistFields, UserFields } from "@/types/api/users";
import { defineProps, defineEmits } from "vue";

interface Props {
  userDetails: UserFields;
  artistDetails: ArtistFields;
  errors: Record<string, string>;
  loading: boolean;
  formActionType: "edit" | "create";
  formType: "user" | "artist";
  submitForm: () => void;
}

const { userDetails, artistDetails, errors, submitForm } = defineProps<Props>();
</script>
