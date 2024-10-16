import type { UserDetailsType } from "@/types/api/users";
import { apiClient } from "./client";

export const getUsers = async (
  page = 1,
  perPage = 1,
  search = "",
  sortBy = ""
): Promise<any> => {
  return apiClient({
    url: `/users?page=${page}&per_page=${perPage}&search=${search}&sort_by=${sortBy}`,
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

export const updateUser = async (
  id: string,
  data: UserDetailsType
): Promise<any> => {
  return apiClient({
    url: `/users/${id}`,
    method: "PUT",
    contentType: "application/json",
    payload: data,
  });
};

export const getUserById = async (id: string): Promise<any> => {
  return apiClient({
    url: `/users/${id}`,
    method: "GET",
    contentType: "application/json",
  });
};

export const deleteUserById = async (id: number): Promise<any> => {
  return apiClient({
    url: `/users/${id}`,
    method: "DELETE",
    contentType: "application/json",
  });
};
