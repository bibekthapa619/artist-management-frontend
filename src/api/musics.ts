import { apiClient } from "./client";

export const getMusics = async (
  page = 1,
  perPage = 1,
  search = "",
  sortBy = ""
): Promise<any> => {
  return apiClient({
    url: `/musics?page=${page}&per_page=${perPage}&search=${search}&sort_by=${sortBy}`,
    method: "GET",
    contentType: "application/json",
  });
};

export const getMusicById = async (id: string): Promise<any> => {
  return apiClient({
    url: `/musics/${id}`,
    method: "GET",
    contentType: "application/json",
  });
};

export const createMusic = async (data: any): Promise<any> => {
  return apiClient({
    url: `/musics`,
    method: "POST",
    contentType: "application/json",
    payload: data,
  });
};

export const updateMusic = async (id: string, data: any): Promise<any> => {
  return apiClient({
    url: `/musics/${id}`,
    method: "PUT",
    contentType: "application/json",
    payload: data,
  });
};

export const deleteMusic = async (id: number): Promise<any> => {
  return apiClient({
    url: `/musics/${id}`,
    method: "DELETE",
    contentType: "application/json",
  });
};
