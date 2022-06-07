import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue"
import LinksView from "../views/LinksView.vue"

const routes = [
  {
    path: "/",
    name: "index",
    component: HomeView
  },
  {
    path: "/links",
    name: "links",
    component: LinksView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router