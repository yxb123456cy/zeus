<template>
  <div class="auth-container">
    <el-card class="auth-card">
      <div class="logo-wrapper">
        <img src="/vite.svg" alt="Logo" class="logo" />
        <h1 class="company-name">Zeus Vue3+TS Admin System</h1>
      </div>
      <h2 class="auth-title">找回密码</h2>
      <el-form :model="form" :rules="rules" ref="formRef" label-position="top">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入注册邮箱" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="auth-btn" @click="handleSubmit">发送重置链接</el-button>
          <el-button type="text" @click="goLogin">返回登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const formRef = ref<FormInstance>()
const form = reactive({
  email: '',
})

const rules: FormRules = {
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
}

const handleSubmit = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      console.log('发送找回链接给', form.email)
      // 发送邮箱重置请求
    }
  })
}

const goLogin = () => router.push('/login')
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("/images/forget_pwd_bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.auth-card {
  width: 450px;
  padding: 10px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.98);
  opacity: 0.85;
}
.auth-title {
  text-align: center;
  margin-bottom: 24px;
  font-size: 20px;
  font-weight: bold;
}
.auth-btn {
  width: 100%;
}
.logo-wrapper {
  text-align: center;
  margin-bottom: 16px;
  font-size: small;
}
</style>
