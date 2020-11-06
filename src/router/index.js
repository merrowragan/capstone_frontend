import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
// import About from "../views/About.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";

import BoardsIndex from "../views/BoardsIndex.vue";
import BoardsNew from "../views/BoardsNew.vue";
import BoardsEdit from "../views/BoardsEdit.vue";
import BoardsShow from "../views/BoardsShow.vue";

import UsersShow from "../views/UsersShow.vue";

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
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
