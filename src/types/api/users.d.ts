import type { SuccessApiResponse } from "./base";
import type { PaginationData, User } from "./common";

interface GetUsersApiResponseSuccess {
  user: User[];
  meta: PaginationData;
}

export interface UserFields {
  id?: number;
  first_name: string;
  last_name: string;
  dob: string;
  gender: string;
  address: string;
  phone: string;
  role?: string;
  email: string;
  password?: string;
}

export interface ArtistFields {
  id?: number;
  name?: string;
  first_release_year?: number;
  no_of_albums_released?: number;
}

export type UserDetailsType = {
  user: UserFields;
};

export type ArtistDetailsType = {
  user: UserFields;
  artist: ArtistFields;
};

export type GetUsersApiResponseSuccess = SuccessApiResponse<LoginResponseData>;
