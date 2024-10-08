import type { ArtistDetailsType } from "@/types/api/users";
import { apiClient } from "./client";

export const getArtists = async (
  page = 1,
  perPage = 1,
  search = ""
): Promise<any> => {
  return apiClient({
    url: `/artists?page=${page}&per_page=${perPage}&search=${search}`,
    method: "GET",
    contentType: "application/json",
  });
};

export const createArtist = async (data: ArtistDetailsType): Promise<any> => {
  return apiClient({
    url: `/artists`,
    method: "POST",
    contentType: "application/json",
    payload: data,
  });
};
