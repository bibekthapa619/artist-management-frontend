import { getCookie } from "@/lib/cookies/cookies";
import { defineStore } from "pinia";

interface UserState {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  } | null;
  isLoggedIn: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    user: null,
    isLoggedIn: false,
  }),
  actions: {
    setUser(userData: {
      firstName: string;
      lastName: string;
      email: string;
      id: number;
      role: string;
    }) {
      this.user = userData;
      this.isLoggedIn = true;
    },
    clearUser() {
      this.user = null;
      this.isLoggedIn = false;
    },
  },
});
