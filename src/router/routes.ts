import LoginView from "@/views/login/LoginView.vue";
import SignupView from "@/views/signup/SignupView.vue";
import DashboardView from "@/views/dashboard/DashboardView.vue";
import UsersView from "@/views/users/UsersView.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue"; // Import the layout
import UserCreateView from "@/views/users/UserCreateView.vue";
import UserEditView from "@/views/users/UserEditView.vue";
import UserShowView from "@/views/users/UserShowView.vue";

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
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "home",
        component: DashboardView,
        meta: {
          roles: ["super_admin", "artist_manager", "artist"],
        },
      },
      {
        path: "users",
        name: "users.index",
        component: UsersView,
        meta: {
          roles: ["super_admin"],
        },
      },
      {
        path: "users/create",
        name: "users.create",
        component: UserCreateView,
        meta: {
          roles: ["super_admin"],
        },
      },
      {
        path: "users/:id/edit",
        name: "users.edit",
        component: UserEditView,
        meta: {
          roles: ["super_admin"],
        },
      },
      {
        path: "users/:id",
        name: "users.show",
        component: UserShowView,
        meta: {
          roles: ["super_admin"],
        },
      },
    ],
  },
];

export { guestRoutes, authRoutes };
