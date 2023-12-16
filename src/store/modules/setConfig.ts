import { defineStore } from "pinia";

const setConfig = defineStore({
  id: "setConfig",
  state: () => ({
    // 侧边栏
    sidebar: {
      collapsed: false,
    },
  }),
  actions: {
    setCollapsed() {
      this.sidebar.collapsed = !this.sidebar.collapsed;
    },
  },
  persist: true,
});

export const setConfigStore = () => setConfig();
