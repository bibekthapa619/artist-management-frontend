import type { User } from "@/types/common/common";
import type { UserState } from "@/types/store/user";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    user: {} as User | null,
    isLoggedIn: false,
  }),
  actions: {
    setUser(userData: User) {
      this.user = userData;
      this.isLoggedIn = true;
    },
    clearUser() {
      this.user = null;
      this.isLoggedIn = false;
    },
  },
});
