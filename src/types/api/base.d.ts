import type { User } from "../common/common";

export interface BaseApiResponse {
  status: string;
  message: string;
}

export interface SuccessApiResponse<T> extends BaseApiResponse {
  status: "success";
  data: T;
}
