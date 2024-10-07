import type { SuccessApiResponse } from "./base";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

interface LoginResponseData {
  user: User;
  token: string;
}

export type LoginApiResponseSuccess = SuccessApiResponse<LoginResponseData>;
export type MeApiResponseSuccess = SuccessApiResponse<User>;
