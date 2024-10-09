import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { me } from "@/api/auth";
import router from "./router";
import "./assets/main.css";

import { useUserStore } from "@/store/userStore";
import { clearCookie } from "@/lib/cookies/cookies";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import type { MeApiResponseSuccess } from "./types/api/auth";
import Vue3Toastify, { toast, type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(Vue3Toastify, {
  autoClose: 1000,
  position: toast.POSITION.BOTTOM_RIGHT,
} as ToastContainerOptions);
app.mount("#app");

const initializeApp = async () => {
  const userStore = useUserStore();

  try {
    userStore.setLoading(true);
    const response: MeApiResponseSuccess = await me();
    const userData = response.data;

    if (userData) {
      userStore.setUser({
        firstName: userData.first_name,
        lastName: userData.last_name,
        email: userData.email,
        id: userData.id,
        role: userData.role,
      });
    } else {
      handleAuthenticationFailure();
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      handleAuthenticationFailure();
    } else {
      console.error("Failed to fetch user data:", error);
    }
  } finally {
    userStore.setLoading(false);
  }

  app.use(router);
};

const handleAuthenticationFailure = () => {
  const userStore = useUserStore();
  userStore.clearUser();
  clearCookie("token");
};

export const notifySuccess = (text: string) => {
  toast(text, {
    type: "success",
  });
};

export const notifyError = (text: string) => {
  toast(text, {
    type: "error",
  });
};

initializeApp();
