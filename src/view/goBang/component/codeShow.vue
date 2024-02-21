<template>
  <el-drawer title="逻辑展示" direction="btt" size="75%">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="搭建" name="1">
        <buildCollapseItem/>
      </el-collapse-item>
      <el-collapse-item title="校验" name="2">
        <cs-title title="规则校验" />
        <p>
          五子棋的胜利规则是：在棋盘上先形成5个或更多相同颜色棋子的直线（水平、垂直或对角线）的一方获胜。因此，我们可以在落子的时候对棋盘进行检查
          是否在（水平、垂直或对角线）直线上形成了5子连珠。
        </p>
        <el-tabs type="border-card">
          <el-tab-pane label="全局式校验">
            <globalVerification />
          </el-tab-pane>
          <el-tab-pane label="八爪鱼校验">正在开发......</el-tab-pane>
        </el-tabs>
      </el-collapse-item>
      <el-collapse-item title="源码" name="3">
        仓库：<el-button type="primary" text @click="open()">https://github.com/Zzx244/Zhangzx</el-button>
      </el-collapse-item>
    </el-collapse>
  </el-drawer>
</template>

<script setup>
import { csTitle } from "@/components/codeShow";
import { globalVerification,buildCollapseItem } from "@/view/goBang/component";
import { defineComponent } from "vue";
defineComponent({
  'cs-title':csTitle,
})
const open = ()=>{
  window.open('https://github.com/Zzx244/Zhangzx')
}
</script>

<style lang="less" scoped>
p {
  margin: 5px 0;
  padding: 0 10px;
}
</style>
