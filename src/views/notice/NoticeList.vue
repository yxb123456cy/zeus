<template>
  <div class="p-4">
    <el-card style="background-color: rgba(255,255,255,0.8)">
      <el-button type="primary" @click="openDialog()">发布通知</el-button>

      <el-card style="margin-top: 2vh" header="通知列表">
        <el-table :data="paginatedData"  border  class="my-4" stripe  highlight-current-row>
          <el-table-column prop="title"  width="240">
            <template #header>
            <span style="font-weight: bolder;font-size: 15px;color: black">标题</span>
            </template>
            <template #default="{ row }">
              <el-popover
                  placement="top"
                  trigger="hover"
                  :content="row.title"
              >
                <template #reference>
                  <span class="ellipsis">{{ row.title }}</span>
                </template>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column prop="publisher" width="250" >
            <template #header>
              <span style="font-weight: bolder;font-size: 15px;color: black">发布人</span>
            </template>
            <template #default="{ row }">
             <el-tag>{{row.publisher}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="status"  width="120" >
            <template #header>
              <span style="font-weight: bolder;font-size: 15px;color: black">状态</span>
            </template>
            <template #default="{ row }">
              <el-tag :type="row.status==='草稿'?'info': 'success' ">{{row.status}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="readState"  width="100">
            <template #header>
              <span style="font-weight: bolder;font-size: 15px;color: black">阅读状态</span>
            </template>
            <template #default="{ row }">
              <el-tag :type="row.readState==='已读'?'success': 'danger' ">{{row.readState}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="publishTime" label="" >
            <template #header>
              <span style="font-weight: bolder;font-size: 15px;color: black">发布时间</span>
            </template>
          </el-table-column>

          <el-table-column  width="180">
            <template #header>
              <span style="font-weight: bolder;font-size: 15px;color: black">操作</span>
            </template>
            <template #default="{ row }">
              <el-button size="default" @click="openDialog(row)">编辑</el-button>
              <el-button size="default" type="danger" @click="onDelete(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card style="background-color: rgba(255,255,255,0.8);margin-top: 1vh">
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :total="notices.length"
            layout="prev, pager, next"
        />
      </el-card>

      <NoticeDialog v-model:visible="dialogVisible" :notice="editingNotice" @save="onSave" />
    </el-card>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type {Notice} from "../../types/notice.ts";
import {mockNotices} from "../../mock/notice.ts";
import NoticeDialog from "./NoticeDialog.vue";


const notices = ref<Notice[]>([...mockNotices])
const dialogVisible = ref(false)
const editingNotice = ref<Notice | null>(null)

const currentPage = ref(1);
const pageSize = ref(10);
/**
 * 分页逻辑;
 */
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return notices.value.slice(start, start + pageSize.value)
})
/**
 * 打开新增或修改通知的对话框组件;
 * @param notice
 */
const openDialog = (notice?: Notice) => {
  editingNotice.value = notice ? { ...notice } : null
  dialogVisible.value = true
}
/**
 * 保存通知;
 * @param notice
 */
const onSave = (notice: Notice) => {
  if (notice.id) {
    const index = notices.value.findIndex(n => n.id === notice.id)
    if (index !== -1) notices.value[index] = notice
  } else {
    notice.id = Date.now()
    notice.publishTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
    notices.value.unshift(notice)
  }
  ElMessage.success('保存成功')
  dialogVisible.value = false
}

/**
 * 修改通知;
 * @param id
 */
const onDelete = (id: number) => {
  ElMessageBox.confirm('确定删除该通知吗？', '提示').then(() => {
    notices.value = notices.value.filter(n => n.id !== id)
    ElMessage.success('删除成功')
  })
}
</script>
<style scoped lang="less">
.ellipsis {
  display: inline-block;
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}
.el-table .el-table__cell {
  box-sizing: border-box;
  min-width: 0;
  padding: 8px 0;
  position: relative;
  font-size: larger;
  font-weight: bolder;
  text-align: left;
  text-overflow: ellipsis;
  vertical-align: middle;
  z-index: var(--el-table-index);
}
</style>
