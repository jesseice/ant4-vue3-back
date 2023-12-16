<template>
  <a-layout>
    <a-layout-sider
      :style="siderStyle"
      v-model:collapsed="setStore.sidebar.collapsed"
    >
      <Side_ />
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="headerStyle"><Header_ /></a-layout-header>
      <a-layout-content :style="contentStyle">
        <router-view></router-view>
      </a-layout-content>
      <!-- <a-layout-footer :style="footerStyle">Footer</a-layout-footer> -->
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import Side_ from "./side.vue";
import Header_ from "./header.vue";
import { CSSProperties } from "vue";
import { setConfigStore } from "@/store";
const setStore = setConfigStore();

const siderStyle: CSSProperties = {
  // backgroundColor: "#fff",
};
const headerStyle: CSSProperties = {
  backgroundColor: "#fff",
  height: "64px",
};
const contentStyle: CSSProperties = {
  padding: "10px 0 0 10px",
  height: `calc(100vh - ${headerStyle.height})`,
  boxSizing: "border-box",
  overflowY: "auto",
};
const footerStyle: CSSProperties = {
  // backgroundColor: "red",
};
</script>
