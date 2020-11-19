import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import History from "../views/History.vue";
import Resources from "../views/Resources.vue";
import RoleModels from "../views/RoleModels.vue";
import Media from "../views/LgbtMedia.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";

import BoardsIndex from "../views/BoardsIndex.vue";
import BoardsNew from "../views/BoardsNew.vue";
import BoardsEdit from "../views/BoardsEdit.vue";
import BoardsShow from "../views/BoardsShow.vue";

import UsersShow from "../views/UsersShow.vue";
import UsersEdit from "../views/UsersEdit.vue";

import ImagesIndex from "../views/ImagesIndex.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/history",
    name: "history",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/History.vue"),
  },
  {
    path: "/resources",
    name: "resources",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Resources.vue"),
  },
  {
    path: "/role-models",
    name: "role-models",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/RoleModels.vue"),
  },
  {
    path: "/lgbt-media",
    name: "lgbt-media",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LgbtMedia.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  
  { path: "/login", 
    name: "login", 
    component: Login },

  { path: "/logout",
    name: "logout", 
    component: Logout },

  {
    path: "/boards",
    name: "boards-index",
    component: BoardsIndex,
  },
  {
    path: "/boards/new",
    name: "boards-new",
    component: BoardsNew
  },
  {
    path: "/boards/:id/edit", 
    name: "boards-edit",
    component: BoardsEdit
  },
  {
    path: "/boards/:id",
    name: "boards-show",
    component: BoardsShow
  },
  {
    path: "/users/:id",
    name: "users-show",
    component: UsersShow
  },
  {
    path: "/images",
    name: "images-index",
    component: ImagesIndex
  },
  {
    path: "/users/:id/edit",
    name: "users-edit",
    component: UsersEdit
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
