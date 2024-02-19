<template>
  <div class="titleHead">
    {{ title }}
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps(['title']);
</script>

<style lang="less" scoped>
.titleHead{
    width: 100%;
    padding: 5px;
    margin: 5px 0;
    font-size: 24px;
    font-weight: 600;
    line-height: 1.5;
}
</style>
