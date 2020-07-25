import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import InFieldView from "../views/InFieldView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "field",
    component: InFieldView
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
