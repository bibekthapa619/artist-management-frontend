import { apiClient } from "./client";

export const login = async (email: string, password: string): Promise<any> => {
  return apiClient({
    url: "/auth/login",
    method: "POST",
    payload: { email, password },
    contentType: "application/json",
  });
};

export const me = async (): Promise<any> => {
  return apiClient({
    url: "/auth/me",
    method: "GET",
    contentType: "application/json",
  });
};
