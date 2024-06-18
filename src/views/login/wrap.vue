<template>
  <div class="wrap">
    <div class="title">
      <div>欢迎登录系统</div>
      <div>WELCOME!</div>
    </div>
    <div class="content">
      <a-form :model="formData">
        <a-form-item>
          <a-input v-model:value="formData.username" placeholder="请输入账号">
            <template #prefix> <UserOutlined />&nbsp;&nbsp;|&nbsp;</template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input-password
            v-model:value="formData.password"
            placeholder="请输入密码"
          >
            <template #prefix>
              <LockOutlined />&nbsp;&nbsp;|&nbsp;
              <!-- <UnlockOutlined /> -->
            </template>
          </a-input-password>
          <div style="text-align: right; margin-top: 10px">
            <a-checkbox v-model:checked="remenber">记住密码</a-checkbox>
          </div>
        </a-form-item>
      </a-form>
    </div>
    <a-button type="primary" block @click="login" style="margin-top: 8px">
      登录
    </a-button>
  </div>
</template>
<script lang="ts" setup>
import {
  UserOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons-vue";
const formData = reactive({
  username: undefined,
  password: undefined,
});
const remenber = ref(false);
const login = () => {
  console.log("[formData] ---> ", formData);
};
</script>
<style lang="less" scoped>
.wrap {
  margin: 10px;
  border: 1px solid #f2f2f2;

  width: 288.6px;
  height: 360.6px;
  backdrop-filter: blur(24px);
  padding: 33.5px 29px 75.6px;
  box-sizing: border-box;

  .title {
    text-align: center;
    margin-bottom: 24.2px;
    div:nth-of-type(1) {
      font-size: 21.6px;
      font-weight: 700;
      line-height: 31.28px;
      color: rgba(2, 17, 43, 1);
      margin-bottom: 7.2px;
    }
    div:nth-of-type(2) {
      font-size: 9.6px;
      font-weight: 400;
      line-height: 13.9px;
      color: rgba(2, 17, 43, 1);
    }
  }
  .content {
    &:deep(.ant-input-prefix),
    &:deep(input::placeholder) {
      color: rgba(7, 40, 185, 1);
    }
    &:deep(input::placeholder) {
      font-size: 12px;
      font-weight: 400;
      line-height: 17.38px;
      color: rgba(7, 40, 185, 1);
    }
  }
  .footer {
  }
}
</style>
