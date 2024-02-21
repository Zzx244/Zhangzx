<!-- 需求：
1.三子连珠提示（可选）
2.五子连珠显示胜利棋子(完成)
3.校验规则优化 
4.格子优化 棋子下在交叉线上（完成）
5.悔棋功能添加（完成）-->
<template>
  <div class="container">
    <!-- 逻辑展示 -->
    <div class="show">
      <el-button type="primary" round @click="table = true" :icon="Pointer">
        逻辑展示
      </el-button>
      <code-show v-model="table" />
      <return-button type="round" />
    </div>
    <!-- 下棋提示 -->
    <div class="checkerboardTitle">
      <div class="prompt">{{ content[arrayIndex] }}</div>
      请落子
      <el-button-group v-if="!form.setup">
        <el-button type="primary" @click="form.setup = true" :icon="View" />
        <el-button
          type="primary"
          @click="regretChess()"
          :disabled="!regretChessArr.length"
          :icon="RefreshLeft"
        />
      </el-button-group>
    </div>
    <!-- 棋盘 -->
    <div class="checkerboard">
      <div v-for="(row, i) in list" :key="i" class="row">
        <div
          v-for="(call, j) in row"
          :key="j"
          class="col"
          @click="play(i, j)"
          :class="{
            col__border: !form.style,
            col__before: form.style,
            isHighlihjt: isHighlihjt(i, j),
          }"
        >
          {{ call }}
        </div>
      </div>
    </div>
    <!-- 功能按钮 -->
    <div class="function-buttons" v-if="form.setup">
      <el-button-group>
        <el-button type="primary" @click="form.setup = false" :icon="Hide" />
        <el-button
          type="primary"
          @click="regretChess()"
          :disabled="!regretChessArr.length"
          :icon="RefreshLeft"
        />
        <el-button type="primary" @click="length()" :icon="Refresh" />
        <el-button type="primary" @click="setUp = true" :icon="Setting" />
      </el-button-group>
    </div>
  </div>
  <!-- 设置 -->
  <el-dialog
    v-model="setUp"
    title="棋盘设置"
    width="350px"
    :close-on-click-modal="false"
  >
    <el-form
      label-width="120px"
      :model="form"
      :rules="setRule"
      ref="setFormDataRef"
    >
      <el-form-item label="设备详情：" prop="equipment">
        <el-radio-group v-model="form.equipment" class="ml-4">
          <el-radio label="mobile" size="large">移动端</el-radio>
          <el-radio label="pc" size="large">PC端</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="棋盘大小:" v-if="form.equipment">
        <el-select v-model.number="form.size">
          <el-option value="9" label="9" />
          <el-option value="12" label="12" />
          <el-option v-if="form.equipment === 'pc'" value="16" label="16" />
          <el-option v-if="form.equipment === 'pc'" value="25" label="25" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.equipment">
        <el-checkbox v-model="form.setup" label="设置栏" size="large" />
        <el-checkbox v-model="form.style" label="交叉棋盘" size="large" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit(setFormDataRef)"
          >确定</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- 胜利提示 -->
  <victory-dialog
    :length="length"
    :content="content[(arrayIndex + 1) % 2]"
    v-model="victory"
  />
</template>

<script setup>
import returnButton from "@/components/return-button";
import { victoryDialog } from "@/view/goBang/component";
import { defineComponent, onMounted, reactive, ref } from "vue";
import {
  Pointer,
  View,
  Hide,
  Setting,
  RefreshLeft,
  Refresh,
} from "@element-plus/icons-vue";
import codeShow from "./codeShow.vue";
defineComponent({
  "victory-dialog": victoryDialog,
  "code-show": codeShow,
  "return-button": returnButton,
});
const table = ref(false);
const form = reactive({
  size: 9,
  equipment: "",
  setup: false,
  style: false,
});
const setUp = ref(true);
const content = ["X", "O"];
const victory = ref(false);
const list = ref([]);
const maxW = ref();
const setRule = {
  equipment: [{ required: true, message: "请选择设备类型", trigger: "blur" }],
};
const setFormDataRef = ref();
let arrayIndex = 0;
onMounted(() => {
  length();
  maxW.value = Math.round(window.innerWidth / 31 - 2);
});
//重置
const length = () => {
  list.value = Array.from({ length: form.size }, () =>
    Array(form.size > maxW.value ? maxW.value : form.size).fill("")
  );
  if (victory.value === true) {
    victory.value = false;
  }
  arrayIndex = 0;
  regretChessArr.value = [];
  victoryArr.value = [];
};
//落子
const play = (i, j) => {
  if (list.value[i][j] !== "") return;
  list.value[i][j] = content[arrayIndex];
  arrayIndexRule();
  rule(i, j);
  // octopusRule(i, j);
  //悔棋
  regretChessArr.value.push({ i, j });
};
//下棋方提示
const arrayIndexRule = () => {
  arrayIndex++;
  if (arrayIndex > 1) {
    arrayIndex = 0;
  }
};
//悔棋
const regretChessArr = ref([]);
const regretChess = () => {
  let chessPieces = regretChessArr.value[regretChessArr.value.length - 1];
  list.value[chessPieces.i][chessPieces.j] = "";
  regretChessArr.value.pop();
  arrayIndexRule();
  victoryArr.value = [];
};
const submit = (res) => {
  if (!res) return;
  res.validate((valid, fields) => {
    if (valid) {
      length();
      setUp.value = false;
    } else {
      console.log(fields);
    }
  });
};
/**
 * 第一版教研规则 全棋盘验证 若棋盘过大会影响 内存
 * list.value[i][j] [i]代表y轴 [j]代表x轴
 * 横向判断 纵向判断 左斜/右斜判断
 */
const rule = (i, j) => {
  let arr = [];
  const ruleArr = (array, y, x) => {
    if (array.every((res) => res === content[(arrayIndex + 1) % 2])) {
      setTimeout(() => (victory.value = true), 700);
      [y, x] = [y, x].map((res) =>
        Array.isArray(res) ? res : new Array(5).fill(res)
      );
      victoryArr.value = y.map((item, i) => {
        return [item, x[i]];
      });
    }
    arr = [];
  };
  for (let a = 0; a < list.value[i].length - 4; a++) {
    let aArr = [];
    for (let number = 0; number < 5; number++) {
      aArr.push(a + number);
      arr.push(list.value[i][aArr[number]]);
    }
    ruleArr(arr, i, aArr);
    for (let number = 0; number < 5; number++) {
      aArr.push(a + number);
      arr.push(list.value[aArr[number]][j]);
    }
    ruleArr(arr, aArr, j);
    for (let b = 0; b < list.value[i].length - 4; b++) {
      let bArr = [];
      for (let number = 0; number < 5; number++) {
        bArr.push(b + number);
        arr.push(list.value[aArr[number]][bArr[number]]);
      }
      ruleArr(arr, aArr, bArr);
    }
    for (let b = list.value[i].length - 1; b > 3; b--) {
      let bArr = [];
      for (let number = 0; number < 5; number++) {
        bArr.push(b - number);
        arr.push(list.value[aArr[number]][bArr[number]]);
      }
      ruleArr(arr, aArr, bArr);
    }
  }
};
/**
 * 第二版教研规则 落子周边判断
 */
// const octopusRule = (y, x) => {
//   console.log(y, x);
//   for (let a = x - 5; a < x + 5; a++) {
//     if (a < 0) {
//       continue;
//     } else if (a > list.value[y].length) {
//       continue;
//     }
//     console.log("横轴=>", y, a);
//   }
// };

//显示胜利棋子
const victoryArr = ref([]);
const isHighlihjt = (i, j) => {
  return victoryArr.value.some((item) => item[0] === i && item[1] === j);
};
</script>

<style lang="less" scoped>
.checkerboardTitle {
  font-size: 30px;
  color: #409eff;
  margin-bottom: -20px;
  font-weight: bolder;
}
.show {
  max-width: 350px;
  width: 80%;
  display: flex;
  align-items: start;
  margin-bottom: 20px;
}
.checkerboard {
  margin: 50px;
  background-color: aliceblue;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 3px solid rgba(0, 0, 0, 0.2);
  overflow: hidden;
  .row {
    display: flex;
    .col {
      position: relative;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 35px;
      font-weight: bolder;
    }
  }
}
.col__border {
  border: 0.5px solid rgba(0, 0, 0, 0.1);
}
.col__before {
  &::before,
  &::after {
    content: "";
    position: absolute;
    background-color: rgba(0, 0, 0, 0.1);
  }
  &::before {
    width: 2px;
    height: 100%;
    top: 0;
    left: 49%;
  }
  &::after {
    height: 2px;
    width: 100%;
    left: 0;
    top: 49%;
  }
}
.prompt {
  display: inline-flex;
  width: 25px;
}
.function-buttons {
  position: absolute;
  bottom: 18%;
}
.isHighlihjt {
  color: red;
}
</style>
