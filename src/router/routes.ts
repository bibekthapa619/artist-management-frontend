import LoginView from "@/views/login/LoginView.vue";
import SignupView from "@/views/signup/SignupView.vue";
import DashboardView from "@/views/dashboard/DashboardView.vue";
import UsersView from "@/views/users/UsersView.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue"; // Import the layout
import UserCreateView from "@/views/users/UserCreateView.vue";
import UserEditView from "@/views/users/UserEditView.vue";
import UserShowView from "@/views/users/UserShowView.vue";
import NotFound from "@/views/not-found/NotFound.vue";
import ArtistsView from "@/views/artists/ArtistsView.vue";
import ArtistCreateView from "@/views/artists/ArtistCreateView.vue";
import ArtistEditView from "@/views/artists/ArtistEditView.vue";
import ArtistShowView from "@/views/artists/ArtistShowView.vue";
import ArtistImportView from "@/views/artists/ArtistImportView.vue";
import ArtistMusicView from "@/views/artists/ArtistMusicView.vue";
import MusicsView from "@/views/musics/MusicsView.vue";
import MusicCreateView from "@/views/musics/MusicCreateView.vue";
import MusicEditView from "@/views/musics/MusicEditView.vue";

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
      {
        path: "artists",
        name: "artists.index",
        component: ArtistsView,
        meta: {
          roles: ["super_admin", "artist_manager"],
        },
      },
      {
        path: "artists/create",
        name: "artists.create",
        component: ArtistCreateView,
        meta: {
          roles: ["super_admin", "artist_manager"],
        },
      },
      {
        path: "artists/:id/edit",
        name: "artists.edit",
        component: ArtistEditView,
        meta: {
          roles: ["super_admin", "artist_manager"],
        },
      },
      {
        path: "artists/import",
        name: "artists.import",
        component: ArtistImportView,
        meta: {
          roles: ["artist_manager"],
        },
      },
      {
        path: "artists/:id",
        name: "artists.show",
        component: ArtistShowView,
        meta: {
          roles: ["super_admin", "artist_manager"],
        },
      },
      {
        path: "artists/:id/music",
        name: "artists.music",
        component: ArtistMusicView,
        meta: {
          roles: ["super_admin", "artist_manager"],
        },
      },
      {
        path: "/musics",
        name: "musics.index",
        component: MusicsView,
        meta: {
          roles: ["artist"],
        },
      },
      {
        path: "/musics/create",
        name: "musics.create",
        component: MusicCreateView,
        meta: {
          roles: ["artist"],
        },
      },
      {
        path: "/musics/:id",
        name: "musics.edit",
        component: MusicEditView,
        meta: {
          roles: ["artist"],
        },
      },
      {
        path: "/404",
        name: "not-found",
        component: NotFound,
      },
      {
        path: "/:catchAll(.*)",
        name: "NoPath",
        component: NotFound,
      },
    ],
  },
];

export { guestRoutes, authRoutes };
