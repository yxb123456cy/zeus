<script setup lang="ts">
import {ref} from 'vue'
import { useRestPasswordStore} from "../stores/RestPasswordDlalogStore.ts";
const restPasswordStore = useRestPasswordStore();
const title = ref<string>('重置密码')


const handleClose = () => {
  restPasswordStore.setShow(false);
}
const handleConfirm = () => {
  // 提交重置逻辑（模拟）
  restPasswordStore.setShow(false);
}

</script>

<template>
  <el-dialog
      v-model="restPasswordStore.show"
      :title="title"
      width="500"
      @close="handleClose"
  >
    <span>确定重置密码?</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="danger" @click="handleConfirm">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style scoped lang="less">

</style>