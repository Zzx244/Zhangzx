<template>
  <div class="page">
    <el-button
      @click="router.push(i.router)"
      type="primary"
      v-for="i in pageLink"
      :key="i"
      :disabled="!i.router"
      >{{ i.title }}</el-button
    >
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { pageLink } from "./pageLink";
const router = useRouter();
</script>

<style lang="less" scoped>
.page {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 30%;
  min-width: 300px;
  button {
    margin: 5px;
  }
}
</style>
