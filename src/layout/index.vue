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
  backgroundColor: "#F5F5F5",
  padding: "10px",
  boxSizing: "border-box",
  height: "100vh",
};
const headerStyle: CSSProperties = {
  backgroundColor: "#F5F5F5",
  height: "74px",
  marginBottom: "10px",
  padding: "10px 0 0",
  boxSizing: "border-box",
};
const contentStyle: CSSProperties = {
  backgroundColor: "#F5F5F5",
  height: `calc(100vh - ${headerStyle.height} - ${headerStyle.marginBottom})`,
  boxSizing: "border-box",
  overflowY: "auto",
};
</script>
