<template>
  <div class="profile-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>个人中心</span>
        </div>
      </template>

      <div class="profile-header">
        <el-avatar :size="80" :src="user.avatar"/>
        <div class="profile-info">
          <h2> {{ user.nickname }}</h2>
          <p style="margin-top:2vh">
            <el-tag>{{ user.email }}</el-tag>
          </p>
        </div>
      </div>

      <el-divider/>

      <el-form :model="form" label-width="100px" :rules="rules" ref="formRef">
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname" placeholder="请输入昵称"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱"/>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号"/>
        </el-form-item>

        <el-form-item>
          <el-button style="width:8vw" type="primary" @click="handleSubmit" size="large">保存</el-button>
          <el-button style="width:8vw" @click="handleReset" size="large">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import {ElMessage} from 'element-plus'
import type {FormInstance, FormRules} from 'element-plus';
import {useUserStateStore} from "../../stores/userState.ts";

const UserStateStore = useUserStateStore();
const user = reactive({
  avatar: UserStateStore.getCurrentUser
      .value?.baseInfo.avatar,
  nickname: UserStateStore.getCurrentUser.value
      ?.baseInfo.nickname,
  email: `2186256471@qq.com`
})

const form = reactive({
  nickname: user.nickname,
  email: user.email,
  phone: ''
})

const formRef = ref<FormInstance>()

const rules: FormRules = {
  nickname: [{required: true, message: '请输入昵称', trigger: 'blur'}],
  email: [
    {required: true, message: '请输入邮箱', trigger: 'blur'},
    {type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change']}
  ],
  phone: [
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入有效的手机号',
      trigger: 'blur'
    }
  ]
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success('保存成功（模拟）')
      // 实际场景可在此处发请求保存修改信息
    }
  })
}

const handleReset = () => {
  Object.assign(form, {
    nickname: user.nickname,
    email: user.email,
    phone: ''
  })
}
</script>

<style scoped>
.profile-container {
  max-width: 700px;
  margin-left: 4vw;
}

.card-header {
  font-size: 18px;
  font-weight: bold;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.profile-info {
  margin-left: 20px;
}

.profile-info h2 {
  margin: 0;
  font-size: 20px;
}

.profile-info p {
  margin: 4px 0 0;
  color: #666;
}
</style>
