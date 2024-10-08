import type { UserDetailsType } from "@/types/api/users";
import { apiClient } from "./client";

export const getUsers = async (
  page = 1,
  perPage = 1,
  search = ""
): Promise<any> => {
  return apiClient({
    url: `/users?page=${page}&per_page=${perPage}&search=${search}`,
    method: "GET",
    contentType: "application/json",
  });
};

export const createUser = async (data: UserDetailsType): Promise<any> => {
  return apiClient({
    url: `/users`,
    method: "POST",
    contentType: "application/json",
    payload: data,
  });
};
