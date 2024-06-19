import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

const modules = import.meta.glob("./modules/**/*.ts", {
  eager: true,
  import: "default",
});
const routeModuleList: Array<RouteRecordRaw> = [];
Object.keys(modules).forEach((key) => {
  // @ts-ignore
  routeModuleList.push(...modules[key]);
});

// 存放动态路由
export const asyncRouterList: Array<RouteRecordRaw> = [...routeModuleList];

const routes = [
  {
    path: "/",
    name: "/",
    redirect: asyncRouterList[0].path,
  },
  ...asyncRouterList,
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    name: "404",
    component: () => import('@/views/result/404.vue')
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
