<template>
  <el-container class="dashboard-container">
    <!-- 顶部 -->
    <el-header class="dashboard-header">
      <div class="header-left">
        <img src="/vite.svg" alt="logo" class="logo"/>
        <span class="title" @click="goHome">{{ PROJECT_NAME }}</span>
      </div>
      <div class="header-right">
        <el-icon class="full-icon" @click="toggleFullScreen">
          <FullScreen/>
        </el-icon>
        <el-avatar :size="35" :src="DEFAULT_USER_AVATAR" @click="goProfile"/>
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ DEFAULT_USER_NAME }}
            <el-icon class="el-icon--right">
              <arrow-down/>
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goProfile">
                <el-icon>
                  <User/>
                </el-icon>
                个人中心
              </el-dropdown-item>
              <el-dropdown-item @click="restPasswordStore.setShow(true)">
                <el-icon>
                  <Edit/>
                </el-icon>
                重置密码
              </el-dropdown-item>
              <el-dropdown-item divided @click="logout">
                <el-icon>
                  <SwitchButton/>
                </el-icon>
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>

    <el-container>
      <!-- 左侧菜单栏 -->
      <el-aside width="200px" class="dashboard-aside">
        <el-menu
            router
            :default-active="defaultActive"
            class="el-menu-vertical custom-menu"
            background-color="transparent"
            text-color="#1e5631"
            active-text-color="#1b3d1b"
        >
          <el-menu-item index="/dashboard/home" @click="menuActiveStore.setCurrentlyMenu('/dashboard/home')">
            <el-icon>
              <House/>
            </el-icon>
            <span>首页</span>
          </el-menu-item>
            <el-menu-item index="/dashboard/dataBigScreen" @click="menuActiveStore.setCurrentlyMenu('/dashboard/dataBigScreen')">
              <el-icon><DataBoard /></el-icon>
              <span>数据大屏</span>
          </el-menu-item>
          <el-sub-menu index="/management">
            <template #title>
              <el-icon>
                <location/>
              </el-icon>
              <span>公司管理</span>
            </template>
            <el-menu-item-group title="公司管理">
              <el-menu-item index="/dashboard/departmentManagement">
                <el-icon>
                  <User/>
                </el-icon>
                <span>部门管理</span>
              </el-menu-item>
              <el-menu-item index="/dashboard/employeeManagement"
                            @click="menuActiveStore.setCurrentlyMenu('/dashboard/employeeManagement')">
                <el-icon>
                  <User/>
                </el-icon>
                <span>员工管理</span>
              </el-menu-item>
              <el-menu-item index="/dashboard/roleManagement">
                <el-icon>
                  <User/>
                </el-icon>
                <span>角色管理</span>
              </el-menu-item>
              <el-menu-item index="/dashboard/permissionManagement">
                <el-icon>
                  <User/>
                </el-icon>
                <span>权限管理</span>
              </el-menu-item>
            </el-menu-item-group>

          </el-sub-menu>
          <el-sub-menu index="/logAudit">
            <template #title>
              <el-icon><List /></el-icon>
              <span>日志审计</span>
            </template>
            <el-menu-item-group title="日志审计">
              <el-menu-item index="/dashboard/errorLogAudit">
                <el-icon><CloseBold /></el-icon>
                <span>错误日志</span>
              </el-menu-item>
              <el-menu-item index="/dashboard/actionLogAudit"
                            @click="menuActiveStore.setCurrentlyMenu('/dashboard/userManagement')">
                <el-icon><Link /></el-icon>
                <span>操作日志</span>
              </el-menu-item>
              <el-menu-item index="/dashboard/loginLogAudit">
                <el-icon><Position /></el-icon>
                <span>登录日志</span>
              </el-menu-item>
            </el-menu-item-group>

          </el-sub-menu>
          <el-sub-menu index="/notice">
            <template #title>
              <el-icon><Notification /></el-icon>
              <span>通知管理</span>
            </template>
            <el-menu-item-group title="通知管理">
              <el-menu-item index="/dashboard/publishNotice">
                <el-icon><Plus /></el-icon>
                <span>发布通知</span>
              </el-menu-item>
              <el-menu-item index="/dashboard/noticeList"
                            @click="menuActiveStore.setCurrentlyMenu('/dashboard/noticeList')">
                <el-icon><List /></el-icon>
                <span>通知列表</span>
              </el-menu-item>
            </el-menu-item-group>

          </el-sub-menu>


          <el-menu-item index="/dashboard/profile" @click="menuActiveStore.setCurrentlyMenu('/dashboard/profile')">
            <el-icon>
              <Setting/>
            </el-icon>
            <span>个人中心</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/swagger-api-view"
                        @click="menuActiveStore.setCurrentlyMenu('/dashboard/swagger-api-view')">
            <el-icon>
              <Document/>
            </el-icon>
            <span>接口文档</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/settings" @click="menuActiveStore.setCurrentlyMenu('/dashboard/settings')">
            <el-icon>
              <Setting/>
            </el-icon>
            <span>系统设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 右侧内容 -->
      <el-main class="dashboard-main">
        <!--       todo 后续添加路由过渡效果-->
        <RouterView/>
        <RestPasswordDIalog/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router'
import {
  ArrowDown,
  CloseBold, DataBoard,
  Document,
  Edit,
  FullScreen,
  House,
  List,
  Location, Notification, Plus, Position,
  Setting,
  User
} from "@element-plus/icons-vue";
import {DEFAULT_USER_AVATAR, DEFAULT_USER_NAME, PROJECT_NAME} from "../../config";
import {useRestPasswordStore} from "../../stores/RestPasswordDlalogStore.ts";
import {useMenuActiveStore} from "../../stores/MenuActiveStore.ts";

const route = useRoute()
const defaultActive = computed(() => route.path)
const menuActiveStore = useMenuActiveStore();
const restPasswordStore = useRestPasswordStore();
const router = useRouter()

const logout = () => {
  router.push('/login')
  menuActiveStore.restCurrently();
}

const goHome = () => {
  router.push("/dashboard/home");
}

const goProfile = () => {
  router.push('/dashboard/profile')
  menuActiveStore.setCurrentlyMenu('');
}

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
</script>

<style scoped>
.dashboard-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.dashboard-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #e4e7ed;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  height: 32px;
  margin-right: 12px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.full-icon {
  font-size: 20px;
  cursor: pointer;
}

.dashboard-aside {
  position: sticky;
  top: 60px;
  align-self: flex-start;
  height: calc(100vh - 60px);
  background: linear-gradient(to bottom, #d2f8d2, #a1e3a1);
  color: #1e5631;
}

.el-menu-vertical {
  border-right: none;
}

.dashboard-main {
  flex: 1;
  background: #f5f7fa;
  padding: 15px;
  overflow-y: auto;
}

/* 自定义菜单样式 */
.custom-menu {
  border-right: none;
  background-color: transparent;
}

.custom-menu .el-menu-item {
  transition: background-color 0.3s, color 0.3s;
  border-radius: 4px;
  margin: 4px 8px;
}

.custom-menu .el-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.4);
  color: #145c2b;
}

.custom-menu .el-menu-item.is-active {
  background-color: #ffffff;
  color: #1b3d1b;
  font-weight: bold;
  position: relative;
}

/* 左侧高亮条 */
.custom-menu .el-menu-item.is-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 6px;
  bottom: 6px;
  width: 4px;
  background-color: #1b3d1b;
  border-radius: 2px;
}

/* 图标颜色与文字同步 */
.custom-menu .el-menu-item i,
.custom-menu .el-menu-item .el-icon {
  color: inherit;
}

:deep(.el-tooltip__trigger:focus-visible) {
  outline: unset;
}
</style>
