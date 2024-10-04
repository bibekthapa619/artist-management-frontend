import LoginView from "@/views/login/LoginView.vue";
import SignupView from "@/views/signup/SignupView.vue";
import HomeView from "@/views/HomeView.vue";

const guestRoutes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
    meta: { requiresAuth: false },
  },
];

const authRoutes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/test",
    name: "test",
    component: HomeView,
    meta: { requiresAuth: true },
  },
];

export { guestRoutes, authRoutes };
