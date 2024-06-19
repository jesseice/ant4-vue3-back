<template>
  <div class="c-header">
    <a-row style="text-align: center">
      <a-col
        :span="4"
        style="display: flex; align-items: center; justify-content: center"
      >
        <!-- <a-input-search placeholder="input search text" style="width: 200px" /> -->
      </a-col>
      <a-col :span="16"></a-col>
      <a-col :span="4">
        <a-dropdown v-model:open="visible" :trigger="['click']">
          <a-button type="text" class="ant-dropdown-link" @click.prevent>
            <UserOutlined />
            管理员
            <DownOutlined />
          </a-button>
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
const router = useRouter();
const dropdownItems = [
  {
    key: "1",
    label: "退出登录",
    icon: LogoutOutlined,
    onClick: () => {
      router.push("/login");
    },
  },
];
</script>
<style scoped>
.c-header {
  background-color: #fff;
  border-radius: 20px 0 0 20px;
  height: 100%;
}
</style>
