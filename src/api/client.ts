import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { getCookie } from "@/lib/cookies/cookies";
import config from "@/config/config";

interface ApiClientOptions {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  payload?: any;
  options?: AxiosRequestConfig;
  signal?: AbortSignal;
  contentType?: string;
}

const apiClient = async ({
  url,
  method = "GET",
  payload = null,
  options,
  signal,
  contentType = "application/json",
}: ApiClientOptions): Promise<any> => {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${getCookie("token") || ""}`,
    Accept: "application/json",
  };

  if (contentType) {
    headers["Content-Type"] = contentType;
  }

  const axiosOptions: AxiosRequestConfig = {
    url: `${config.apiUrl}${url}`,
    method,
    headers,
    data: payload,
    signal,
    ...options,
  };

  const response: AxiosResponse<any> = await axios(axiosOptions);
  return response.data;
};

export { apiClient };
