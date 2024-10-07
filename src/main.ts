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

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);

const initializeApp = async () => {
  const userStore = useUserStore();

  try {
    const response = await me();
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
  }

  app.use(router);
  app.mount("#app");
};

const handleAuthenticationFailure = () => {
  const userStore = useUserStore();
  userStore.clearUser();
  clearCookie("token");
};

initializeApp();
