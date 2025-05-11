<template>
  <div class="p-4">
    <el-card style="background-color: rgba(255,255,255,0.8)">

      <el-card style="margin-top: 2vh" header="错误日志列表">
        <el-table :data="paginatedData" border class="my-4" stripe highlight-current-row>
          <el-table-column prop="message" width="200">
            <template #header>
              <span style="font-weight: bolder;font-size: 15px;color: black">错误信息</span>
            </template>
            <template #default="{ row }">
              <el-popover
                  placement="top"
                  trigger="hover"
                  :content="row.message"
              >
                <template #reference>
                  <span class="ellipsis">{{ row.message }}</span>
                </template>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column prop="stackTrace" width="200">
            <template #header>
              <span style="font-weight: bolder;font-size: 15px;color: black">错误堆栈</span>
            </template>
            <template #default="{ row }">
              <el-popover
                  placement="top"
                  trigger="hover"
                  :content="row.stackTrace"
              >
                <template #reference>
                  <span class="ellipsis">{{ row.stackTrace }}</span>
                </template>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column prop="file" width="auto">
            <template #header>
              <span style="font-weight: bolder;font-size: 15px;color: black">对应文件</span>
            </template>
            <template #default="{ row }">
              <el-tag type="danger">{{ row.file }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="level" width="auto">
            <template #header>
              <span style="font-weight: bolder;font-size: 15px;color: black">日志等级</span>
            </template>
            <template #default="{ row }">
              <el-tag type="danger">{{ row.level }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="timestamp" width="auto">
            <template #header>
              <span style="font-weight: bolder;font-size: 15px;color: black">时间</span>
            </template>
            <template #default="{ row }">
              {{ row.timestamp }}
            </template>
          </el-table-column>
          <el-table-column prop="line" width="100">
            <template #header>
              <span style="font-weight: bolder;font-size: 15px;color: black">错误位置</span>
            </template>
            <template #default="{ row }">
              <span>{{ row.line }}</span>
            </template>
          </el-table-column>
          <el-table-column width="100">
            <template #header>
              <span style="font-weight: bolder;font-size: 15px;color: black">操作</span>
            </template>
            <template #default="{ row }">
              <el-button size="default" type="danger" @click="clickDelete(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card style="background-color: rgba(255,255,255,0.8);margin-top: 1vh">
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :total="errorLogs.length"
            layout="prev, pager, next"
        />
      </el-card>

    </el-card>

  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import {mockErrorLogs} from "../../../mock/log.ts";
import type {ErrorLog} from "../../../types/log";


const errorLogs = ref<ErrorLog[]>([...mockErrorLogs])
// const dialogVisible = ref(false)
// const editingNotice = ref<Permission | null>(null)

const currentPage = ref(1);
const pageSize = ref(10);

const clickDelete = (row?: ErrorLog) => {
  console.log(row);
  ElMessage.error("不能进行删除!");
}
/**
 * 分页逻辑;
 */
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return errorLogs.value.slice(start, start + pageSize.value)
})
/**
 * 打开新增或修改权限的对话框组件;
 * @param permission
 */
// const openDialog = (permission?: Permission) => {
//   editingNotice.value = permission ? {...permission} : null
//   dialogVisible.value = true
// }
/**
 * 保存通知;
 * @param permission
 */
// const onSave = (permission: Permission) => {
//   console.log(permission);
// }
//
// /**
//  * 修改通知;
//  * @param id
//  */
// const onDelete = (id: number) => {
// }
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
