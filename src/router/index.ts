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
    redirect: "/home",
  },
  ...asyncRouterList,
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
