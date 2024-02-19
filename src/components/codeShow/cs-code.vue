<template>
  <div class="codeClone" @mouseover="mouseover()" @mouseout="mouseout()">
    <button @click="copy()">
      <span>
        {{ text }}
      </span>
    </button>
    <pre>{{ props.code }}</pre>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { defineProps } from "vue";
const props = defineProps(["code", "type"]);
const text = ref(props.type === "js" ? "js" : "模版");
const mouseover = () => {
  text.value = "复制";
};
const mouseout = () => {
  text.value = props.type === "js" ? "js" : "模版";
};
const copy = async () => {
  try {
    await navigator.clipboard.writeText(props.code);
    ElMessage({
      message: "复制成功",
      type: "success",
    });
  } catch (err) {
    ElMessage.error(err);
  }
};
</script>

<style lang="less" scoped>
.codeClone {
  position: relative;
  margin: 10px 0px;
  background-color: rgb(27, 27, 27);
  border-radius: 5px;
  color: rgb(193, 196, 200);
  padding: 25px 25px 0 25px;
  pre {
    padding: 5px 0 25px 0;
    overflow-x: auto;
  }
  button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
    border-radius: 5px;
    margin: 5px;
    color: rgba(193, 196, 200, 0.5);
    background-color: rgb(27, 27, 27);
    border: none;
    &:hover {
      background-color: rgb(75, 75, 75);
    }
  }
}
</style>
