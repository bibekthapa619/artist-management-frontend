import type { SuccessApiResponse } from "./base";
import type { PaginationData, User } from "./common";

interface GetUsersApiResponseSuccess {
  user: User[];
  meta: PaginationData;
}

export type GetUsersApiResponseSuccess = SuccessApiResponse<LoginResponseData>;
