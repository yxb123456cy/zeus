<template>
  <el-dialog v-model="visible" :title="form.id ? '编辑通知' : '发布通知'" width="500px">
    <el-form :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="form.content" :rows="4" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" placeholder="请选择">
          <el-option label="草稿" value="草稿" />
          <el-option label="已发布" value="已发布" />
        </el-select>
      </el-form-item>
      <el-form-item label="阅读状态">
        <el-select v-model="form.readState">
          <el-option label="未读" value="未读" />
          <el-option label="已读" value="已读" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type {Notice} from "../../types/notice.ts";

/**
 * defineProps：定义组件接受的外部 props，比如 visible 控制弹窗显示、notice 是传入的通知数据。
 */
const props = defineProps<{
  visible: boolean
  notice: Notice | null
}>()
/**
 * defineEmits：定义组件对外发出的事件，比如当用户保存或关闭弹窗时通知父组件。
 */

const emit = defineEmits(['update:visible', 'save'])

const visible = ref(props.visible)
const form = ref<Notice>({
  id: 0,
  title: '',
  content: '',
  publisher: '管理员',
  publishTime: '',
  status: '草稿',
  readState: '未读'
})

watch(() => props.visible, val => {
  visible.value = val
  form.value = props.notice ? { ...props.notice } : {
    id: 0,
    title: '',
    content: '',
    publisher: '管理员',
    publishTime: '',
    status: '草稿',
    readState: '未读'
  }
})

watch(visible, val => emit('update:visible', val))

const handleSubmit = () => {
  emit('save', { ...form.value })
}
</script>
