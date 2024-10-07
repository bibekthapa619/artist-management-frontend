import { apiClient } from "./client";

export const getUsers = async (page = 1, perPage = 1): Promise<any> => {
  return apiClient({
    url: `/users?page=${page}&per_page=${perPage}`,
    method: "GET",
    contentType: "application/json",
  });
};
