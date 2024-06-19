<template>
  <div class="wrap">
    <div class="title">
      <div>欢迎登录系统</div>
      <div>WELCOME!</div>
    </div>
    <div class="content">
      <a-form :model="formData" ref="form" :rules="rules">
        <a-form-item name="username">
          <a-input
            v-model:value="formData.username"
            placeholder="请输入账号"
            @press-enter="login"
          >
            <template #prefix> <UserOutlined />&nbsp;&nbsp;|&nbsp;</template>
          </a-input>
        </a-form-item>
        <a-form-item name="password" style="margin: 0">
          <a-input-password
            v-model:value="formData.password"
            placeholder="请输入密码"
            @press-enter="login"
          >
            <template #prefix>
              <LockOutlined />&nbsp;&nbsp;|&nbsp;
              <!-- <UnlockOutlined /> -->
            </template>
          </a-input-password>
        </a-form-item>
      </a-form>
      <div style="text-align: right; margin-top: 8px">
        <a-checkbox v-model:checked="remenber">记住密码</a-checkbox>
      </div>
    </div>
    <a-button
      type="primary"
      block
      :loading="loginLoading"
      style="margin-top: 24px"
      @click="login"
    >
      登录
    </a-button>
  </div>
</template>
<script lang="ts" setup>
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { REMENBER_PASSWORD } from "@/utils/global";
const router = useRouter();
const form: any = ref(null);
const formData = ref({
  username: undefined,
  password: undefined,
});

const remenber = ref(false);
const loginLoading = ref(false);

const rules = {
  username: [{ required: true, message: "请输入账号!" }],
  password: [{ required: true, message: "请输入密码!" }],
};

onMounted(() => {
  const remenberData = JSON.parse(
    localStorage.getItem(REMENBER_PASSWORD) || "{}"
  );
  if (Object.keys(remenberData).length) {
    formData.value = remenberData;
  }
});

const login = async () => {
  try {
    await form.value.validate();
    loginLoading.value = true;
    // TODO 登录操作
    await new Promise((resolve) => setTimeout(() => resolve(1), 2000));

    //
    if (remenber.value) {
      localStorage.setItem(REMENBER_PASSWORD, JSON.stringify(formData.value));
    }
    router.push("/");
  } catch (error) {
    console.log("[error] ---> ", error);
  } finally {
    loginLoading.value = false;
  }
};
</script>
<style lang="less" scoped>
.wrap {
  position: absolute;
  right: 89px;
  top: 129px;
  width: 261px;
  height: 324px;
  backdrop-filter: blur(24px);
  padding: 33.5px 29px 75.6px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: #eff6ff;

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
    &:deep(.ant-form-item:nth-of-type(2)) {
      margin: 0;
    }
    &:deep(.ant-input-prefix) {
      color: rgba(7, 40, 185, 1);
    }
    &:deep(input::placeholder) {
      color: rgba(7, 40, 185, 1);
    }
    &:deep(input::placeholder) {
      font-size: 12px;
      font-weight: 400;
      line-height: 17.38px;
      color: rgba(7, 40, 185, 1);
    }
    &:deep(input) {
      color: rgba(7, 40, 185, 1);
      background-color: #dde8ff;
    }
    &:deep(.ant-checkbox-inner) {
      width: 13px;
      height: 13px;
    }
    &:deep(.ant-checkbox-wrapper) {
      font-size: 12px;
      color: rgba(7, 40, 185, 1);
    }
    &:deep(.ant-input-affix-wrapper) {
      border: 1px solid rgba(7, 40, 185, 1);
      background-color: #dde8ff;
    }
    &:deep(.ant-form-item-explain-error) {
      font-size: 12px;
    }
  }
}
</style>
