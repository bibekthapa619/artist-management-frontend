import { createRouter, createWebHistory } from "vue-router";
import { guestRoutes, authRoutes } from "./routes";
import { useUserStore } from "@/store/userStore";
import { storeToRefs } from "pinia";
import { getCookie } from "@/lib/cookies/cookies";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...guestRoutes, ...authRoutes],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const { user, isLoggedIn } = storeToRefs(userStore);

  const isAuthenticated = isLoggedIn.value;
  // const isAuthenticated = getCookie("token") ? true : false;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "login" });
  } else if (!to.meta.requiresAuth && isAuthenticated) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
