import { apiClient } from "./client";

export const getMusics = async (
  page = 1,
  perPage = 1,
  search = ""
): Promise<any> => {
  return apiClient({
    url: `/musics?page=${page}&per_page=${perPage}&search=${search}`,
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
