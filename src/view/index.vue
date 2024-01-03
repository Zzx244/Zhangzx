<template>
    <h1>前端项目集合</h1>
    <div class="container">
        <div class="button">
            <el-button @click="gotoGobang()" type="primary">五子棋</el-button>
        </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const gotoGobang = () => {
    router.push('/gobang');
 }
  </script>
  
  <style lang="less" scoped>
    .content {
      min-width: 500px;
      min-height: 300px;
      background-color: aliceblue;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-radius: 50px;
    }
  </style>
  