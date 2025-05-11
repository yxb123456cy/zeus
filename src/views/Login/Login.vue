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
          <div style="display: flex; justify-content: left;align-items: center">
            <el-tag>请选择一个用户:</el-tag>
            <el-select
                v-model="value"
                placeholder="选择用户"
                size="default"
                style="width: 150px;margin-left: 1.5vw"
            >
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
            <span style="display: flex; justify-content: center;align-items: center;margin-left: 1.5vw">
              <el-avatar :src="user_avatar"/>
              <el-tag type="success" style="margin-left: 0.5vw">{{ user_name }}</el-tag>
            </span>
          </div>

          <!-- 模拟用户快捷登录 -->
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
import {initialEmployees} from "../../mock/initialEmployees.ts";
import {useUserStateStore} from "../../stores/userState.ts";

const UserStateStore = useUserStateStore();
const user_avatar = ref<string>("https://qy-red-book.oss-cn-guangzhou.aliyuncs.com/resources/avatar/67700cbb11c98ab3f5837115.jpg");
const user_name = ref<string>("admin");
const options_index = ref<number>(0);
const value = ref('admin')
watchEffect(() => {
  if (value.value === 'admin') {
    user_avatar.value = initialEmployees[0].baseInfo.avatar ? initialEmployees[0].baseInfo.avatar : "";
    user_name.value = initialEmployees[0].baseInfo.username;
    form.username = initialEmployees[0].baseInfo.username;
    form.password = initialEmployees[0].baseInfo.password;
    options_index.value = 0;
  }
  if (value.value === 'dev_leader') {
    options_index.value = 1;
    user_avatar.value = initialEmployees[1].baseInfo.avatar ? initialEmployees[1].baseInfo.avatar : "";
    user_name.value = initialEmployees[1].baseInfo.username;
    form.username = initialEmployees[1].baseInfo.username;
    form.password = initialEmployees[1].baseInfo.password;
  }
  if (value.value === 'commonEmployee') {
    options_index.value = 2;
    user_avatar.value = initialEmployees[2].baseInfo.avatar ? initialEmployees[2].baseInfo.avatar : "";
    user_name.value = initialEmployees[2].baseInfo.username;
    form.username = initialEmployees[2].baseInfo.username;
    form.password = initialEmployees[2].baseInfo.password;
  }
})
const options = [
  {
    value: 'admin',
    label: '管理员',
  },
  {
    value: 'dev_leader',
    label: '研发部领导',
  },
  {
    value: 'commonEmployee',
    label: '普通员工',
  },
]
const router = useRouter()
const formRef = ref<FormInstance>()
const form = reactive({
  username: 'admin',
  password: 'admin',
})

const rules: FormRules = {
  username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
  password: [{required: true, message: '请输入密码', trigger: 'blur'}],
}

const handleLogin = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 登录逻辑
      if (form.username === initialEmployees[options_index.value]
              .baseInfo.username
          && form.password === initialEmployees[options_index.value]
              .baseInfo.password) {
        UserStateStore.currentUser = initialEmployees[options_index.value];
        UserStateStore.setLoginState(true);
        console.log('登录成功', form);
        router.push('/dashboard');
        ElMessage.success("登录成功!");
      } else {
        ElMessage.error("账号或密码错误,请重新输入!");
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
  flex: 6;
  background-image: url('/images/login_bg.jpg'); /* 替换为你的图片路径 */
  background-size: cover;
  background-position: center;
}

.login-right {
  flex: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(219, 112, 147, 0.24);
}

.login-form-wrapper {
  width: 100%;
  max-width: 520px;
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
