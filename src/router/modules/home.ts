import BasicLayout from "@/layout/index.vue";
import { CodepenOutlined } from "@ant-design/icons-vue";
export default [
  {
    path: "/components",
    name: "components",
    meta: { title: "组件", icon: CodepenOutlined },
    component: BasicLayout,
    redirect: "/components/table",
    children: [
      {
        path: "table",
        name: "table",
        meta: { title: "通用表格" },
        component: () => import("@/views/components/customTable/index.vue"),
      },
    ],
  },
];
