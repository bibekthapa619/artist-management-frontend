<template>
  <div class="">
    <nav class="text-sm mb-4">
      <router-link to="/users" class="text-primary hover:underline"
        >Artists</router-link
      >
      <span class="mx-2">/</span>
      <span>Music</span>
    </nav>
    <h1 class="text-2xl font-bold mb-4">Artist Musics</h1>
    <div class="flex justify-between items-center mb-4 space-x-4">
      <SortOptions
        :options="sortOptions"
        :modelValue="selectedSort"
        @update:modelValue="selectedSort = $event"
      />
      <SearchInput
        v-model:searchQuery="searchQuery"
        class="w-48 sm:w-64"
        :placeholder="`Search music...`"
      />
    </div>
    <div class="hidden sm:block">
      <ArtistMusicTable :musics="musics" :paginationData="paginationData" />
    </div>
    <div class="block sm:hidden">
      <ArtistMusicCard v-if="musics.length" :musics="musics" />
    </div>
    <Pagination
      :pagination="paginationData"
      :updateCurrentPage="updateCurrentPage"
    />
  </div>
</template>

<script setup lang="ts">
import { getArtistMusics } from "@/api/artists";
import Pagination from "@/components/pagination/Pagination.vue";
import SearchInput from "@/components/search/SearchInput.vue";
import SortOptions from "@/components/table/SortOptions.vue";
import ArtistMusicCard from "@/sections/artists/ArtistMusicCard.vue";
import ArtistMusicTable from "@/sections/artists/ArtistMusicTable.vue";
import type { Music, PaginationData } from "@/types/api/common";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const musics = ref<Music[]>([]);
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
const route = useRoute();
const userId: string | string[] = route.params.id;

const selectedSort = ref("name-asc");
const sortOptions = [
  { value: "name-asc", label: "Name(Asc)" },
  { value: "name-desc", label: "Name(Desc)" },
  { value: "last-modified", label: "Last Modified" },
  { value: "date-created", label: "Date Created" },
];

const fetchMusic = async (
  page = 1,
  perPage = pageSize.value,
  query = "",
  sortBy = sortOptions[0].value
) => {
  let res = await getArtistMusics(
    userId as string,
    page,
    perPage,
    query,
    sortBy
  );
  musics.value = res.data.musics;
  paginationData.value = res.data.meta;
};

watch(searchQuery, (newQuery) => {
  fetchMusic(1, pageSize.value, newQuery, selectedSort.value);
});

watch(selectedSort, (newSort) => {
  fetchMusic(1, pageSize.value, searchQuery.value, newSort);
});

onMounted(async () => {
  await fetchMusic();
});

const updateCurrentPage = async (page: number) => {
  await fetchMusic(page, pageSize.value, searchQuery.value, selectedSort.value);
};
</script>
