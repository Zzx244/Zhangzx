<template>
  <el-button
    type="primary"
    :round="type"
    @click="goHome()"
    :class="type ? 'round' : ''"
    :icon="HomeFilled"
  />
</template>

<script setup>
import {HomeFilled} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { defineProps } from "vue";
defineProps(["type"]);
const router = useRouter();
const goHome = () => {
  router.push("/");
};
</script>

<style lang="less">
.round {
  margin-left: 5px;
}
</style>
