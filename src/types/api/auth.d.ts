import type { SuccessApiResponse } from "./base";
import type { User } from "./common";

interface LoginResponseData {
  user: User;
  token: string;
}

export type LoginApiResponseSuccess = SuccessApiResponse<LoginResponseData>;
export type MeApiResponseSuccess = SuccessApiResponse<User>;
