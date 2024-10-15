<template>
  <nav class="text-sm mb-4">
    <router-link to="/users" class="text-primary hover:underline"
      >Artists</router-link
    >
    <span class="mx-2">/</span>
    <span>Import</span>
  </nav>
  <h1 class="text-2xl font-bold mb-4">Import Artists</h1>

  <div class="bg-white shadow-md rounded p-6">
    <!-- Download Sample CSV -->
    <div class="flex justify-end mb-4">
      <button
        @click="downloadSampleCSV"
        class="bg-indigo-700 hover:bg-indigo-600 text-white py-2 px-4 rounded"
      >
        Download Sample CSV
      </button>
    </div>

    <div
      class="bg-orange-100 border border-orange-400 text-gray-700 px-4 py-3 rounded relative mt-4"
      role="alert"
      v-if="errors.length > 0"
    >
      <strong class="font-bold">Your file contains following errors:</strong>
      <ul class="mt-2 list-disc list-inside text-sm">
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
    </div>
    <!-- CSV Upload Button -->
    <div class="mt-4">
      <label for="csvFile" class="block text-sm font-medium text-gray-700"
        >Upload CSV</label
      >
      <input
        type="file"
        @change="handleFileUpload"
        accept=".csv"
        class="mt-2 border border-gray-300 p-2 rounded-md w-full"
      />
    </div>

    <!-- Import Button -->
    <div class="flex justify-end mt-4">
      <button
        @click="importCSV"
        :disabled="loading"
        class="bg-indigo-700 hover:bg-indigo-600 text-white py-2 px-4 rounded"
      >
        <span v-if="loading">Importing...</span>
        <span v-else>Import</span>
      </button>
    </div>

    <!-- CSV Upload Instructions -->
    <div
      class="bg-blue-100 border border-blue-400 text-gray-700 px-4 py-3 rounded relative mt-4"
      role="alert"
    >
      <strong class="font-bold">CSV Upload Instructions:</strong>
      <span class="block sm:inline"
        >Please follow the guidelines below to fill the CSV correctly:</span
      >
      <ul class="mt-2 list-disc list-inside text-sm">
        <li>
          Ensure the file is in <strong>CSV format</strong> (comma-separated
          values).
        </li>
        <li>
          The CSV must contain the following headers:
          <strong
            >first_name, last_name, email, phone, dob, gender, address,
            artist_name, first_release_year, no_of_albums_released</strong
          >.
        </li>
        <li>Each row should contain valid data under the correct header.</li>
        <li>
          <strong>Email</strong> must be unique for each entry and in a valid
          format (e.g., <em>name@example.com</em>).
        </li>
        <li><strong>Phone number</strong> should be numeric and 10 digits.</li>
        <li>
          <strong>Date of birth (dob)</strong> should be in
          <em>YYYY-MM-DD</em> format.
        </li>
        <li>
          <strong>Gender</strong> can only be <em>m for male</em>,
          <em>f for female</em>, or <em>o for other</em>.
        </li>
        <li>
          <strong>First release year</strong> should be a valid 4-digit year
          (e.g., 2010).
        </li>
        <li>
          <strong>Number of albums released</strong> should be a non-negative
          integer.
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getArtistImportSample, importArtist } from "@/api/artists";
import { notifySuccess } from "@/main";
import { useAxiosErrorHandler } from "@/lib/errorHandler/axiosErrorHandler";

const csvFile = ref<File | null>(null);
const loading = ref<boolean>(false);

const errors = ref<[]>([]);
const { handleError } = useAxiosErrorHandler(errors);

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  csvFile.value = target.files ? target.files[0] : null;
};

const importCSV = async () => {
  if (!csvFile.value) {
    alert("Please upload a CSV file before importing.");
    return;
  }

  try {
    loading.value = true;
    errors.value = [];
    await importArtist(csvFile.value);

    notifySuccess("File imported successfully");
  } catch (error) {
    handleError(error);
  } finally {
    loading.value = false;
  }
};

const downloadSampleCSV = async () => {
  try {
    let res = await getArtistImportSample();
    const url = window.URL.createObjectURL(new Blob([res]));

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "artist-import-sample.csv");

    document.body.appendChild(link);
    link.click();

    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.log(err);
  }
};
</script>
