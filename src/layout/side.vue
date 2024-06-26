<template>
  <div class="c-side">
    <div class="side-logo">
      <img
        src="https://next.antdv.com/assets/logo.1ef800a8.svg"
        alt=""
        style="width: 40px; height: 40px"
      />
      <span v-if="!setStore.sidebar.collapsed">ANB</span>
    </div>
    <div class="side-menu">
      <a-menu
        v-model:selectedKeys="state.selectedKeys"
        v-model:openKeys="state.openKeys"
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
import { createdIcon, winSizeChangeExpand } from "./utils";
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
const menuItems: any = computed(() =>
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
winSizeChangeExpand({ setStore });

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
  overflow: hidden;
  border-right: 1px solid #f2f2f2;

  box-sizing: border-box;
  border-radius: 20px;
  background-color: #fff;
  padding: 0 3px;
  .side-logo {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    span {
      font-weight: 700;
      font-size: 20px;
    }
  }
  .side-menu {
    height: calc(100% - 64px - 40px);
    box-sizing: border-box;
    &:deep(.ant-menu) {
      border-inline-end: none;
    }
  }
  .side-footer {
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
  }
}
</style>
