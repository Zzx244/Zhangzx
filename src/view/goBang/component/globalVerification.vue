<template>
  <div class="carousel">
    <el-carousel :interval="3000" indicator-position="none" height="300px">
      <el-carousel-item v-for="item in ruleImg" :key="item">
        <el-image :src="item.src" fit="cover" />
      </el-carousel-item>
    </el-carousel>
  </div>
  <h4>
    全局式校验是在棋盘游戏中每次落子之后，对整个棋盘进行检查的方法。它会检查是否有任何五子（或更多）连成一线，这可能会带来胜利。
  </h4>
  <h4>这种校验考虑了四种可能的连线方向：</h4>
  <p>1.横向：棋子沿着左右方向排列。</p>
  <p>
    建立一个for循环来递增a的值改变x轴的轨迹 通过限制<cs-spanCode
      code="aArr"
    />的长度为5 达到横向验证是否存在5子连珠。
  </p>
  <cs-code :code="code1" type="js" />
  <p>2.纵向：棋子沿着上下方向排列。</p>
  <p>纵向只需递增y轴就可以实现效果</p>
  <cs-code :code="code2" type="js" />
  <p>3.上对角线：棋子沿着从左下到右上方向排列。</p>
  <p>
    对角线的校验 需要在1、2的基础上 在内部再次嵌套入一个<cs-spanCode
      code="for"
    />达到y轴递增、x轴递减（这边考虑到代码的整洁就从右上到左下，可以共用一个a的值）
    将<cs-spanCode code="for" />的起始值设置成<cs-spanCode
      code="list.value[i].length - 1"
    />实现尾部向前递减
  </p>
  <cs-code :code="code3" type="js" />
  <p>4.下对角线：棋子沿着从左上到右下方向排列。</p>
  <p>
    和3不同的是 y、x轴同时递增
    起始值和1.2相同从0开始（不能直接将a的值同时放入y、x会导致遍历单一
    无法完全校验）
  </p>
  <cs-code :code="code4" type="js" />
  <h4>校验逻辑</h4>
  <p>
    在上面1.2.3.4每次循环过后 都会通过<cs-spanCode
      code="ruleArr(arr);"
    />传入数组然后进行验证。
  </p>
  <cs-code :code="code5" type="js" />
  <p>
    使用<cs-spanCode code="every" />来对<cs-spanCode
      code="arr"
    />判断是否全部为相同棋子并且等于落子方棋子
  </p>
  <h4>
    简单来说，每次当一个新棋子放置在棋盘上时，全局式校验就会检查整个棋盘，看是否有五颗相同颜色的棋子连成一线，无论是横线、竖线还是斜线。
  </h4>
</template>

<script setup>
import { csCode, csSpanCode } from "@/components/codeShow";
import { defineComponent } from "vue";
defineComponent({
  "cs-code": csCode,
  "cs-spanCode": csSpanCode,
});
const code1 = `for (let a = 0; a < list.value[i].length - 4; a++) {
  let aArr = [];
  for (let number = 0; number < 5; number++) {
    aArr.push(a + number);
    arr.push(list.value[i][aArr[number]]);
  }
}`;
const code2 = `for (let number = 0; number < 5; number++) {
  aArr.push(a + number);
  arr.push(list.value[aArr[number]][j]);
}`;
const code3 = `for (let b = list.value[i].length - 1; b > 3; b--) {
  let bArr = [];
  for (let number = 0; number < 5; number++) {
    bArr.push(b - number);
    arr.push(list.value[aArr[number]][bArr[number]]);
  }
}`;
const code4 = `for (let b = 0; b < list.value[i].length - 4; b++) {
  ......
  bArr.push(b + number);
  ......
}`;
const code5 = `if (array.every((res) => res === 'X'||'O') {
  setTimeout(() => victory.value = true, 700);
}`;
const ruleImg = [
  { src: require("../../../assets/codeShow/codeShow1.png") },
  { src: require("../../../assets/codeShow/codeShow2.png") },
  { src: require("../../../assets/codeShow/codeShow3.png") },
];
</script>

<style lang="less">
.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-carousel {
  width: 310px;
}
</style>
