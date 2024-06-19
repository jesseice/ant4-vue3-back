import { defineStore } from "pinia";

const userStore = defineStore({
  id: "user",
  state: () => ({
    userInfo: {},
    token: "",
  }),
  actions: {
    setUserInfo(info: Record<string, any>) {
      this.userInfo = info;
    },
    setToken(token: string) {
      this.token = token;
    },
    logout() {
      this.userInfo = {};
      this.token = "";
      // TODO 自改
      // router.push('/login');
    },
  },
  getters: {
    isLogin: (state: any) =>
      !!Object.keys(state.userInfo || {}).length || false,
  },
  persist: true,
});

export const getUserStore = () => userStore();
