<template>
  <div class="login">
    <div class="iframe">
      <Wrap />
    </div>
  </div>
</template>
<script setup lang="ts">
import Wrap from "./wrap.vue";
</script>
<style lang="less" scoped>
.login {
  height: 100vh;
  background-image: url(@/assets/bg.png);
  // padding-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  .iframe {
    margin: 0 auto;
    width: 1030px;
    height: 578px;
    background-image: url(@/assets/login.png);
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    border-radius: 10px;
  }
}
</style>
