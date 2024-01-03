<template>
  <div class="homePage">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
.homePage {
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #409eff;
  flex-direction: column;
}
</style>
