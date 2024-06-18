import BasicLayout from "@/layout/index.vue";
import { CodepenOutlined } from "@ant-design/icons-vue";
export default [
  {
    path: "/home",
    name: "home",
    meta: { title: "组件", icon: CodepenOutlined },
    component: BasicLayout,
    redirect: "/home/index",
    children: [
      {
        path: "index",
        name: "homeindex",
        meta: { title: "表格" },
        component: () => import("@/views/components/form.vue"),
      },
      {
        path: "home1",
        name: "home1",
        meta: { title: "表单" },
        component: () => import("@/views/components/table.vue"),
      },
    ],
  },
];
