<template>
  <cs-title title="棋盘搭建" />
  <p>
    创建一个二维数组的方法，数组的尺寸由<cs-spanCode
      code="form.size"
    />和<cs-spanCode code="maxPx.value" />决定
  </p>
  <cs-code :code="code1" type="js" />
  <p>
    先来看一下<cs-spanCode code="Array.from()" />这个函数。<cpanCode
      code="Array.from()"
    />方法从一个类似数组或可迭代对象中创建一个新的、浅拷贝的数组实例。这里的<cs-spanCode
      code="{ length: form.size }"
    />是一个含有<cs-spanCode code="length" />属性的对象，<cs-spanCode
      code="Array.from()"
    />会将其视为数组并创建一个长度为<cs-spanCode code="form.size" />的新数组。
  </p>
  <p>
    <cs-spanCode
      code="Array.from()"
    />的第二个参数是一个映射函数，用于对每个元素进行处理。在这里，它返回另一个数组<cs-spanCode
      code="Array(form.size > maxPx.value ? maxPx.value :form.size).fill('')"
    />。这个数组的长度由<cs-spanCode
      code="form.size > maxPx.value ?maxPx.value : form.size"
    />
    这个三元运算符决定，即如果<cs-spanCode code="form.size" />大于<cs-spanCode
      code="maxPx.value"
    />，则长度为<cs-spanCode code="maxPx.value" /> ，否则为<cs-spanCode
      code="form.size"
    />。然后<cs-spanCode code=".fill('')" />
    将数组填充为空字符串。
  </p>
</template>

<script setup>
import { csCode,csTitle, csSpanCode } from "@/components/codeShow";
import { defineComponent } from "vue";
defineComponent({
  'cs-title':csTitle,
  'cs-code':csCode,
  'cs-spanCode':csSpanCode,
})
const code1 = `Array.from({ length: form.size }, () =>
    Array(form.size > maxPx.value ? maxPx.value : form.size).fill("")
);`;
</script>

<style lang="less"></style>
