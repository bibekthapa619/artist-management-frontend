import type {
  LoginApiResponseSuccess,
  MeApiResponseSuccess,
} from "@/types/api/auth";
import { apiClient } from "./client";

export const login = async (
  email: string,
  password: string
): Promise<LoginApiResponseSuccess> => {
  return apiClient({
    url: "/auth/login",
    method: "POST",
    payload: { email, password },
    contentType: "application/json",
  });
};

export const me = async (): Promise<MeApiResponseSuccess> => {
  return apiClient({
    url: "/auth/me",
    method: "GET",
    contentType: "application/json",
  });
};

export const signup = async (payload: any): Promise<any> => {
  return apiClient({
    url: "/auth/register",
    method: "POST",
    contentType: "application/json",
    payload: payload,
  });
};
