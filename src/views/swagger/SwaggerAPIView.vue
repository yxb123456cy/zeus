<template>
  <div class="wait-container">
    <div>
    </div>
    <div class="content">
      <div>
        <img src="/images/wait.png" alt="wapt.png" style="width: 450px" >
      </div>
      <h2 class="message">待开发</h2>
      <p class="description">
        抱歉,该页面待开发中
      </p>
      <el-button type="danger" @click="goHome">返回首页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const goHome = () => {
  router.push('/')
}
</script>

<style scoped lang="less">
.wait-container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
  text-align: center;
  animation: fadeIn 0.6s ease-out;

  .content {
    max-width: 460px;
    padding: 10px;
  }

  .code {
    font-size: 96px;
    font-weight: bold;
    color: #409eff;
    margin-bottom: 16px;
    animation: float 1.5s ease-in-out infinite;
  }

  .message {
    font-size: 24px;
    margin-bottom: 12px;
    margin-top: -25px;
  }

  .description {
    font-size: 16px;
    color: #666;
    margin-bottom: 24px;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
}
</style>
