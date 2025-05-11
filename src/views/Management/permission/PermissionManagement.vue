<template>
  <div class="p-4">
    <el-card style="background-color: rgba(255,255,255,0.8)">

      <el-card style="margin-top: 2vh" header="权限列表">
        <el-table :data="paginatedData" border class="my-4" stripe highlight-current-row>
          <el-table-column prop="id" width="150">
            <template #header>
              <span style="font-weight: bolder;font-size: 15px;color: black">权限标识</span>
            </template>
            <template #default="{ row }">
              <span style="font-weight: bolder;color: black">Permission--{{ row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" width="240">
            <template #header>
              <span style="font-weight: bolder;font-size: 15px;color: black">名称</span>
            </template>
            <template #default="{ row }">
              <el-popover
                  placement="top"
                  trigger="hover"
                  :content="row.name"
              >
                <template #reference>
                  <span class="ellipsis">{{ row.name }}</span>
                </template>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column prop="path" width="auto">
            <template #header>
              <span style="font-weight: bolder;font-size: 15px;color: black">对应路径</span>
            </template>
            <template #default="{ row }">
              <el-tag>{{ row.path }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="description" width="auto">
            <template #header>
              <span style="font-weight: bolder;font-size: 15px;color: black">详细</span>
            </template>
            <template #default="{ row }">
           <span>{{row.description}}</span>
            </template>
          </el-table-column>
          <el-table-column width="180">
            <template #header>
              <span style="font-weight: bolder;font-size: 15px;color: black">操作</span>
            </template>
            <template #default="{ row }">
              <el-button size="default" @click="clickEdit(row)">编辑</el-button>
              <el-button size="default" type="danger" @click="clickDelete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card style="background-color: rgba(255,255,255,0.8);margin-top: 1vh">
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :total="permissions.length"
            layout="prev, pager, next"
        />
      </el-card>

    </el-card>

  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import {mockPermissions} from "../../../mock/permission.ts";
import type {Permission} from "../../../types/rbac.ts";


const permissions = ref<Permission[]>([...mockPermissions])
// const dialogVisible = ref(false)
// const editingNotice = ref<Permission | null>(null)

const currentPage = ref(1);
const pageSize = ref(10);
const clickEdit=(row?:Permission)=>{
  console.log(row)
  ElMessage.error("不能进行修改!");
}
const clickDelete = ()=>{
  ElMessage.error("不能进行删除!");
}
/**
 * 分页逻辑;
 */
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return permissions.value.slice(start, start + pageSize.value)
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
