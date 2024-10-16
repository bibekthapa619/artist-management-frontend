import type { ArtistDetailsType } from "@/types/api/users";
import { apiClient } from "./client";

export const getArtists = async (
  page = 1,
  perPage = 1,
  search = "",
  sortBy = ""
): Promise<any> => {
  return apiClient({
    url: `/artists?page=${page}&per_page=${perPage}&search=${search}&sort_by=${sortBy}`,
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

export const updateArtist = async (
  id: number,
  data: ArtistDetailsType
): Promise<any> => {
  return apiClient({
    url: `/artists/${id}`,
    method: "PUT",
    contentType: "application/json",
    payload: data,
  });
};

export const getArtistById = async (id: string): Promise<any> => {
  return apiClient({
    url: `/artists/${id}`,
    method: "GET",
    contentType: "application/json",
  });
};

export const deleteArtistById = async (id: number): Promise<any> => {
  return apiClient({
    url: `/artists/${id}`,
    method: "DELETE",
    contentType: "application/json",
  });
};

export const exportArtist = async (search = ""): Promise<any> => {
  return apiClient({
    url: `/artists/export`,
    method: "GET",
    contentType: "application/json",
  });
};

export const importArtist = async (file: File): Promise<any> => {
  let formData = new FormData();
  formData.append("file", file);
  return apiClient({
    url: `/artists/import`,
    method: "POST",
    contentType: "multipart/form-data",
    payload: formData,
  });
};

export const getArtistImportSample = async () => {
  return apiClient({
    url: `/artists/import-sample`,
    method: "GET",
    contentType: "application/json",
  });
};

export const getArtistMusics = async (
  id: string,
  page = 1,
  perPage = 1,
  search = "",
  sortBy = ""
): Promise<any> => {
  return apiClient({
    url: `/artists/${id}/music?page=${page}&per_page=${perPage}&search=${search}&sort_by=${sortBy}`,
    method: "GET",
    contentType: "application/json",
  });
};
