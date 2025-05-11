<template>
  <div class="login-container">
    <!--    左侧大图片-->
    <div class="login-left"></div>

    <!--    右侧登录表单-->
    <div class="login-right">
      <div class="login-form-wrapper">
        <el-card class="login-card">
          <div class="logo-wrapper">
            <img src="/vite.svg" alt="Logo" class="logo"/>
            <h1 class="company-name">{{ PROJECT_NAME }}</h1>
          </div>

          <h2 class="login-title">欢迎登录</h2>
          <el-form :model="form" :rules="rules" ref="formRef" label-position="top">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form.username" placeholder="请输入用户名"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" type="password" placeholder="请输入密码"/>
            </el-form-item>
            <el-form-item style="margin-top: 1.5vh">
              <el-button type="primary" class="login-btn" @click="handleLogin">登录</el-button>
            </el-form-item>
          </el-form>

          <div class="login-links">
            <a @click.prevent="toRegister">注册账号</a>
            <span>|</span>
            <a @click.prevent="toForgot">忘记密码？</a>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import {ElMessage, type FormInstance, type FormRules} from 'element-plus'
import {useRouter} from 'vue-router'
import {PROJECT_NAME} from "../../config";

const router = useRouter()
const formRef = ref<FormInstance>()
const form = reactive({
  username: 'admin',
  password: '123456',
})

const rules: FormRules = {
  username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
  password: [{required: true, message: '请输入密码', trigger: 'blur'}],
}

const handleLogin = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 登录逻辑
      if (form.username === 'admin' && form.password === '123456') {
        console.log('登录成功', form);
        router.push('/dashboard');
        ElMessage.success("登录成功!");
      }
    }
  })
}
onMounted(() => {
  console.log("this is Login.vue");
})

/**
 * 跳转至注册页面;
 */
const toRegister = () => {
  router.push('/register')
}

//跳转至忘记密码页面;
const toForgot = () => {
  router.push('/forgot-password')
}
</script>

<style scoped lang="less">
.login-container {
  display: flex;
  height: 100vh;
}

.login-left {
  flex: 7;
  background-image: url('/images/login_bg.jpg'); /* 替换为你的图片路径 */
  background-size: cover;
  background-position: center;
}

.login-right {
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(219, 112, 147, 0.24);
}

.login-form-wrapper {
  width: 100%;
  max-width: 420px;
  padding: 40px 20px;
}

.login-card {
  padding: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  opacity: 0.9;
}

.logo-wrapper {
  text-align: center;
  margin-bottom: 16px;
}

.logo {
  height: 48px;
  margin-bottom: 8px;
}

.company-name {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.login-title {
  text-align: center;
  margin: 12px 0 24px;
  font-size: 20px;
  font-weight: bold;
}

.login-btn {
  width: 100%;
}

.login-links {
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
}

.login-links a {
  color: #409eff;
  cursor: pointer;
  margin: 0 6px;
}

.login-links a:hover {
  text-decoration: underline;
}
</style>
