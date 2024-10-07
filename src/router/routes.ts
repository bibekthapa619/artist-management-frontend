import LoginView from "@/views/login/LoginView.vue";
import SignupView from "@/views/signup/SignupView.vue";
import DashboardView from "@/views/dashboard/DashboardView.vue";

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
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: "/test",
    name: "test",
    component: DashboardView,
    meta: { requiresAuth: true },
  },
];

export { guestRoutes, authRoutes };
