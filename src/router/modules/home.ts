import BasicLayout from "@/layout/index.vue";
import { HomeOutlined } from "@ant-design/icons-vue";
export default [
  {
    path: "/home",
    name: "home",
    meta: { title: "主页", icon: HomeOutlined },
    component: BasicLayout,
    redirect: "/home/index",
    children: [
      {
        path: "index",
        name: "homeindex",
        meta: { title: "表格" },
        component: () => import("@/views/table/index.vue"),
      },
      {
        path: "home1",
        name: "home1",
        meta: { title: "表单" },
        component: () => import("@/views/form/index.vue"),
      },
      {
        path: "home2",
        name: "home2",
        meta: { title: "2页" },
        component: () => import("@/views/home_2.vue"),
      },
    ],
  },
];
