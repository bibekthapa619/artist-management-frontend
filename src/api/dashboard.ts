import { apiClient } from "./client";

export const getUserStats = async (): Promise<any> => {
  return apiClient({
    url: `/dashboard/users`,
    method: "GET",
    contentType: "application/json",
  });
};

export const getMusicStats = async (): Promise<any> => {
  return apiClient({
    url: `/dashboard/musics`,
    method: "GET",
    contentType: "application/json",
  });
};
