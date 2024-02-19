<template>
  <el-dialog width="350px">
    <div class="title">恭喜“{{ props.content }}”方胜利!</div>
    <div class="button">
      <el-button type="primary" @click="props.length()" :icon="Refresh"/>
      <return-button />
    </div>
  </el-dialog>
</template>

<script setup>
import { Refresh } from "@element-plus/icons-vue";
import { defineProps, defineComponent } from "vue";
import returnButton from "@/components/return-button";
defineComponent({
  "return-button": returnButton,
});
const props = defineProps(["length", "content"]);
</script>

<style lang="less" scoped>
.title {
  text-align: center;
  font-size: 20px;
  font-weight: bolder;
  color: #409eff;
}
.button {
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;
}
</style>
