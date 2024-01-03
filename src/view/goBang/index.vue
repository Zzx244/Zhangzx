<template>
  <!-- 设置 -->
  <el-dialog v-model="setUp" title="棋盘设置" width="350px">
      <el-form label-width="120px" :model="form">
        <el-form-item label="棋盘大小:" >
          <el-select v-model.number="form.size">
            <el-option value="9" label="9"/>
            <el-option value="16" label="16(手机端不支持)"/>
            <el-option value="25" label="25(手机端不支持)"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit()">确定</el-button>
        </el-form-item>
      </el-form>
  </el-dialog>
  <!-- 胜利提示 -->
  <el-dialog v-model="victory" width="350px">
    <div class="title">
      恭喜“{{ content[(arrayIndex+1)%2] }}”方胜利!
    </div>
    <div class="button">
      <el-button type="primary" @click="length()">再来一把</el-button>
      <el-button type="primary" @click="goHome()">返回主页</el-button>
    </div>
  </el-dialog>
  <!-- 棋盘 -->
  <div class="checkerboardTitle">
    {{ content[arrayIndex] }}请落子
    
  </div>
  <div class="checkerboard" :style="{ '--size':list.length }">
    <div v-for="(row,i) in list" :key="i" class="row">
      <div v-for="(call,j) in row" :key="j" class="col" @click="play(i,j)">
        {{ call }}
      </div>
    </div>
  </div>
  <div>
    <el-button type="primary" @click="setupSize()">设置</el-button>
    <el-button type="primary" @click="length()">清空</el-button>
    <el-button type="primary" @click="goHome()">返回主页</el-button>
  </div>
</template>
  
<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();
const form = reactive({
  size:9
})
const setUp = ref(true)
const victory = ref(false)
const content = ['X','O']
const list = ref([])
let arrayIndex = 0
const length = ()=>{
  list.value = Array.from({length:form.size},()=>Array(form.size).fill(''))
  if(victory.value === true){
    victory.value = false
  }
  arrayIndex = 0;
}
length()
const play =(i,j)=>{
  if(list.value[i][j] !== '')return
  list.value[i][j]=content[arrayIndex]
  arrayIndex++
  if(arrayIndex>1){
    arrayIndex = 0
  }
  rule(i,j);
}
const goHome = ()=>{
  router.push('/');
}
const submit = () => {
  length()
  setUp.value = false
}
const setupSize = ()=>{
  setUp.value = true
}
/**
 * 第一版教研规则 全棋盘验证 若棋盘够大会印象 内存
 * list.value[i][j]
 * [i]代表y轴
 * [j]代表x轴
 * 横向判断 纵向判断 左斜/右斜判断
 */
const rule = (i,j)=>{
  let arr = []
  const ruleArr = (array) =>{
    if(array.every((res)=>res === content[(arrayIndex+1)%2])){
      victory.value = true;
    }
  }
  for(let a = 0;a<list.value[i].length - 5;a++){
    arr = [list.value[i][a],list.value[i][a+1],list.value[i][a+2],list.value[i][a+3],list.value[i][a+4]]
    ruleArr(arr);
    arr = [list.value[a][j],list.value[a+1][j],list.value[a+2][j],list.value[a+3][j],list.value[a+4][j]]
    ruleArr(arr);
    for(let b = 0;b<list.value[i].length - 5;b++){
      arr = [list.value[a][b],list.value[a+1][b+1],list.value[a+2][b+2],list.value[a+3][b+3],list.value[a+4][b+4]]
      ruleArr(arr);
    }
     for(let b = list.value[i].length - 1 ;b>5;b--){
      arr = [list.value[a][b],list.value[a+1][b-1],list.value[a+2][b-2],list.value[a+3][b-3],list.value[a+4][b-4]]
      ruleArr(arr);
    }
  }
}
</script>
  
<style lang="less" scoped>
.checkerboardTitle{
  font-size: 30px;
  color: aliceblue;
  margin-bottom: -20px;
  font-weight: bolder;
}
  .checkerboard{
    min-height:calc(var(--size) *31px);
    min-width: calc(var(--size) *31px);
    margin: 50px;
    background-color: aliceblue;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: .5px solid transparent;
    overflow: hidden;
    .row{
      display: flex;
      .col{
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: .5px solid rgba(0,0,0,0.1);
        font-size: 35px;
        font-weight: bolder;
      }
    }
  }
  .title{
    text-align: center;
    font-size: 20px;
    font-weight: bolder;
    color: #409EFF;
  }
  .button{
    display:flex;
    margin-top: 10px;
    justify-content: flex-end;
  }
</style>
  