import { createRouter, createWebHistory } from "vue-router";
import { guestRoutes, authRoutes } from "./routes";
import { useUserStore } from "@/store/userStore";
import { storeToRefs } from "pinia";
import type { Ref } from "vue";
import type { User } from "@/types/common/common";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...guestRoutes, ...authRoutes],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const {
    user,
    isLoggedIn,
  }: { user: Ref<User | null>; isLoggedIn: Ref<boolean> } =
    storeToRefs(userStore);

  const isAuthenticated = isLoggedIn.value;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "login" });
  } else if (!to.meta.requiresAuth && isAuthenticated) {
    next({ name: "home" });
  } else if (
    to.meta.roles &&
    Array.isArray(to.meta.roles) &&
    to.meta.roles.length > 0
  ) {
    if (to.meta.roles.includes(user?.value?.role)) {
      next();
    } else {
      next({ name: "home" });
    }
  } else {
    next();
  }
});

export default router;
