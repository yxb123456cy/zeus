<template>
  <div class="auth-container">
    <el-card class="auth-card">
      <div class="logo-wrapper">
        <img src="/vite.svg" alt="Logo" class="logo" />
        <h1 class="company-name">Zeus Vue3+TS Admin System</h1>
      </div>
      <h2 class="auth-title">注册账号</h2>
      <el-form :model="form" :rules="rules" ref="formRef" label-position="top">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" placeholder="请再次输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="auth-btn" @click="handleRegister">注册</el-button>
          <el-button type="text" @click="goLogin">返回登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const formRef = ref<FormInstance>()
const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator(_, value, callback) {
        if (value === form.password) {
          callback() // 校验通过
        } else {
          callback(new Error('两次密码不一致'))
        }
      },
      trigger: 'blur',
    },
  ],
}

const handleRegister = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      console.log('注册信息', form)
      // 调用注册接口
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
  background-image: url("/images/register_bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.auth-card {
  width: 500px;
  padding: 10px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.98);
  opacity: 0.9;
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
  font-size: small;
  text-align: center;
  margin-bottom: 16px;
}
</style>
