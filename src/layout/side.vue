<template>
  <div class="c-side">
    <div class="side-logo">
      <img
        src="https://next.antdv.com/assets/logo.1ef800a8.svg"
        alt=""
        style="width: 40px; height: 40px"
      />
      <span v-if="!setStore.sidebar.collapsed" style="color: #fff">AVB_</span>
    </div>
    <div class="side-menu">
      <a-menu
        v-model:selectedKeys="state.selectedKeys"
        v-model:openKeys="state.openKeys"
        theme="dark"
        mode="inline"
        :items="menuItems"
        @click="menuClick"
      ></a-menu>
    </div>
    <div class="side-footer" @click="expandMenu">
      <MenuFoldOutlined v-if="!setStore.sidebar.collapsed" />
      <MenuUnfoldOutlined v-else />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { asyncRouterList } from "@/router";
import { ItemType } from "ant-design-vue/es/menu/src/interface";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
import { setConfigStore } from "@/store";
import { createdIcon } from "./utils";
const router = useRouter();
const setStore = setConfigStore();
const createItem = (item: any, parentPath?: string): ItemType => {
  const path = parentPath ? `${parentPath}/${item.path}` : item.path;
  return {
    key: path,
    label: item.meta?.title,
    /** 自己渲染 */
    // @ts-ignore
    icon: () => createdIcon(item.meta?.icon),
    // @ts-ignore
    children: item.children?.map((item) => createItem(item, path)),
  };
};
const menuItems = computed(() =>
  asyncRouterList.map((item) => createItem(item))
);
const state = reactive<{
  selectedKeys: string[];
  openKeys: string[];
}>({
  selectedKeys: [],
  openKeys: [],
});

const activePaths = computed(() => router.currentRoute.value.path);

onMounted(() => {
  // @ts-ignore
  state.selectedKeys = [activePaths.value];
  const pathSplitArr = activePaths.value.split("/");
  state.openKeys = [pathSplitArr.slice(0, pathSplitArr.length - 1).join("/")];
});

const menuClick = ({ key }: any) => {
  router.push(key);
};

const expandMenu = () => {
  setStore.setCollapsed();
  if (setStore.sidebar.collapsed) {
    state.openKeys = [];
  }
};
</script>
<style lang="less" scoped>
.c-side {
  height: 100vh;
  border-right: 1px solid #f2f2f2;
  color: #fff;
  .side-logo {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 40px;
    span {
      font-weight: 700;
      font-size: 20px;
      margin-left: 20px;
    }
  }
  .side-menu {
    height: calc(100vh - 64px - 40px);
    box-sizing: border-box;
  }
  .side-footer {
    height: 40px;
    display: flex;
    align-content: center;
    justify-content: center;
    cursor: pointer;
  }
}
</style>
