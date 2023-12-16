<template>
  <div class="c-header">
    <a-row style="text-align: center">
      <a-col
        :span="4"
        style="display: flex; align-items: center; justify-content: center"
      >
        <a-input-search placeholder="input search text" style="width: 200px" />
      </a-col>
      <a-col :span="16"></a-col>
      <a-col :span="4">
        <UserOutlined />
        <a-dropdown v-model:open="visible" :trigger="['click']">
          <a class="ant-dropdown-link" @click.prevent>
            管理员
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item
                v-for="item in dropdownItems"
                :key="item.key"
                @click="item.onClick"
              >
                <component :is="item.icon" />
                {{ item.label }}
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import {
  DownOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
const visible = ref(false);

const dropdownItems = [
  {
    key: "1",
    label: "退出登录",
    icon: LogoutOutlined,
    onClick: () => {
      alert("退出登录");
    },
  },
];
</script>
