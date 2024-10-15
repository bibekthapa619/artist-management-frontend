<template>
  <div class="">
    <h1 class="text-2xl font-bold mb-4">Artists</h1>

    <div class="flex justify-between items-center mb-4 space-x-4">
      <SearchInput
        v-model:searchQuery="searchQuery"
        class="w-48 sm:w-64 float-right"
        :placeholder="`Search artists...`"
      />
      <div
        class="relative inline-block text-left"
        @click="toggleDropdown"
        id="options-dropdown"
        v-if="user && user.role == 'artist_manager'"
      >
        <button
          class="bg-primary text-white px-4 py-2 h-10 rounded shadow hover:bg-primary-hover flex items-center justify-center"
        >
          Options <i class="fas fa-caret-down ml-2"></i>
        </button>

        <div
          v-if="isDropdownOpen"
          class="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10"
        >
          <router-link
            to="/artists/create"
            class="block px-4 py-2 text-gray-800 hover:bg-primary hover:text-white"
          >
            Create
          </router-link>
          <router-link
            to="/artists/import"
            class="block px-4 py-2 text-gray-800 hover:bg-primary hover:text-white"
          >
            Import
          </router-link>
          <a
            href="#"
            @click.prevent="handleOptionClick('export')"
            class="block px-4 py-2 text-gray-800 hover:bg-primary hover:text-white"
          >
            Export
          </a>
        </div>
      </div>
    </div>

    <div class="hidden md:block">
      <ArtistTable
        :artists="artists"
        :paginationData="paginationData"
        :options="options"
      />
    </div>
    <div class="block md:hidden">
      <ArtistCard v-if="artists.length" :artists="artists" :options="options" />
    </div>
    <Pagination
      :pagination="paginationData"
      :updateCurrentPage="updateCurrentPage"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, onBeforeUnmount } from "vue";
import { deleteArtistById, exportArtist, getArtists } from "@/api/artists";
import Pagination from "@/components/pagination/Pagination.vue";
import type { PaginationData, Artist } from "@/types/api/common";
import SearchInput from "@/components/search/SearchInput.vue";
import ArtistTable from "@/sections/artists/ArtistTable.vue";
import type { TableOption } from "@/components/table/table";
import { useRouter } from "vue-router";
import ArtistCard from "@/sections/artists/ArtistCard.vue";
import { useUserStore } from "@/store/userStore";
import { storeToRefs } from "pinia";
import { notifyError, notifySuccess } from "@/main";

const artists = ref<Artist[]>([]);
const pageSize = ref<number>(3);
const paginationData = ref<PaginationData>({
  total: 0,
  last_page: 0,
  current_page: 0,
  from: 0,
  to: 0,
  page_size: 0,
});
const searchQuery = ref<string>("");
const refresh = ref<boolean>(false);
const router = useRouter();
const isDropdownOpen = ref(false);

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const viewArtist = (artist: Artist) => {
  router.push({
    name: "artists.show",
    params: { id: artist.id },
  });
};

const viewMusic = (artist: Artist) => {
  router.push({
    name: "artists.music",
    params: { id: artist.id },
  });
};

const editArtist = (artist: Artist) => {
  router.push({
    name: "artists.edit",
    params: { id: artist.id },
  });
};

const deleteArtist = async (artist: Artist) => {
  const isConfirmed = confirm(
    `Are you sure you want to delete ${artist.name}?`
  );
  if (isConfirmed) {
    try {
      let res = await deleteArtistById(artist.id as number);
      refresh.value = !refresh.value;
      console.log(res);
      notifySuccess(res.message);
    } catch (err) {
      notifyError("Failed to delete.");
    }
  }
};

const options: TableOption[] = [
  {
    title: "View",
    action: viewArtist,
  },
  {
    title: "Music",
    action: viewMusic,
  },
  {
    title: "Edit",
    action: editArtist,
  },
  {
    title: "Delete",
    action: deleteArtist,
    isDanger: true,
  },
];

const fetchArtists = async (page = 1, perPage = pageSize.value, query = "") => {
  let res = await getArtists(page, perPage, query);
  artists.value = res.data.artists;
  paginationData.value = res.data.meta;
};

watch(searchQuery, (newQuery) => {
  fetchArtists(1, pageSize.value, newQuery);
});

watch(refresh, () => {
  fetchArtists(paginationData.value.current_page, pageSize.value);
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleOptionClick = async (option: string) => {
  if (option === "export") {
    try {
      let res = await exportArtist(searchQuery.value);
      console.log(res);
      const url = window.URL.createObjectURL(new Blob([res]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "artists.csv");

      document.body.appendChild(link);
      link.click();

      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err);
    }
  } else if (option === "import") {
  }
};

onMounted(async () => {
  document.addEventListener("click", handleClickOutside);
  await fetchArtists();
});

const handleClickOutside = (event: MouseEvent) => {
  const dropdown = document.getElementById("options-dropdown");
  if (dropdown && !dropdown.contains(event.target as Node)) {
    isDropdownOpen.value = false;
  }
};

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const updateCurrentPage = async (page: number) => {
  await fetchArtists(page);
};
</script>
