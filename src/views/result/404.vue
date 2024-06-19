<template>
  <div class="no-found">
    <div class="wrap">
      <img src="@/assets/404.png" alt="" />
      <h3>找不到页面</h3>
      <a-button type="primary" @click="$router.push('/')">点此回家</a-button>
    </div>
  </div>
</template>
<style lang="less" scoped>
.no-found {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .wrap {
    width: 400px;
    height: 500px;
    text-align: center;
    img {
      width: 100%;
      height: 400px;
    }
  }
}
</style>
