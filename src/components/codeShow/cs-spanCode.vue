<template>
  <pre class="code">{{ code }}</pre>
</template>

<script setup>
import { defineProps } from "vue";
defineProps(["code"]);
</script>

<style lang="less" scoped>
.code {
  display: inline;
  background-color: rgb(237, 237, 237);
  border-radius: 5px;
  color: rgb(57, 81, 111);
  margin:3px;
  padding: 3px 5px;
  overflow-x: auto;
}
</style>
