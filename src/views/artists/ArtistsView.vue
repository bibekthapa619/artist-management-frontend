<template>
  <div class="">
    <h1 class="text-2xl font-bold mb-4">Artists</h1>

    <div class="flex justify-between items-center mb-4 space-x-4">
      <router-link
        to="/artists/create"
        class="bg-indigo-700 text-white px-4 py-2 h-10 rounded-lg shadow hover:bg-indigo-800 flex items-center justify-center"
      >
        Create
      </router-link>
      <SearchInput
        v-model:searchQuery="searchQuery"
        class="w-48 sm:w-64"
        :placeholder="`Search artists...`"
      />
    </div>

    <div class="hidden md:block">
      <ArtistTable
        :artists="artists"
        :paginationData="paginationData"
        :viewArtist="viewArtist"
        :editArtist="editArtist"
        :deleteArtist="deleteArtist"
        :options="options"
      />
    </div>

    <Pagination
      :pagination="paginationData"
      :updateCurrentPage="updateCurrentPage"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { deleteArtistById, getArtists } from "@/api/artists";
import Pagination from "@/components/pagination/Pagination.vue";
import type { PaginationData, Artist } from "@/types/api/common";
import SearchInput from "@/components/search/SearchInput.vue";
import ArtistTable from "@/sections/artists/ArtistTable.vue";
import type { TableOption } from "@/components/table/table";
import { useRouter } from "vue-router";

const artists = ref<Artist[]>([]);
const pageSize = ref<number>(10);
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

const viewArtist = (artist: Artist) => {
  router.push({
    name: "artists.show",
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
    await deleteArtistById(artist.id as number);
    refresh.value = !refresh.value;
  }
};

const options: TableOption[] = [
  {
    title: "View",
    action: viewArtist,
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
  fetchArtists(1, pageSize.value);
});

onMounted(async () => {
  await fetchArtists();
});

const updateCurrentPage = async (page: number) => {
  await fetchArtists(page);
};
</script>
