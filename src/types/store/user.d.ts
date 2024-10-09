import type { User } from "../common/common";

export interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
}
