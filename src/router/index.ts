import {createRouter, createWebHistory} from 'vue-router'
import type {RouteRecordRaw} from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard/Dashboard.vue'),
        redirect: '/dashboard/home',
        children: [
            {
                path: '/dashboard/home',
                name: 'Home',
                component: () => import('../views/Home/Home.vue'),
                meta: {title: '系统首页'},

            },
            {
                path: '/dashboard/dataBigScreen',
                name: 'DataBigScreen',
                component: () => import('../views/screen/DataBigScreen.vue'),
                meta: {title: '数据大屏'},
            },
            {
                path: '/dashboard/employeeManagement',
                name: 'UserManagement',
                component: () => import('../views/Management/employee/EmployeeManagement.vue'),
                meta: {title: '员工管理'},
            },
            {
                path: '/dashboard/departmentManagement',
                name: 'DepartmentManagement',
                component: () => import('../views/Management/department/DepartmentManagement.vue'),
                meta: {title: '部门管理'},
            },
            {
                path: '/dashboard/roleManagement',
                name: 'RoleManagement',
                component: () => import('../views/Management/role/RoleManagement.vue'),
                meta: {title: '角色管理'},
            },
            {
                path: '/dashboard/permissionManagement',
                name: 'PermissionManagement',
                component: () => import('../views/Management/permission/PermissionManagement.vue'),
                meta: {title: '权限管理'},
            },

            {
                path: '/dashboard/errorLogAudit',
                name: 'ErrorLogAudit',
                component: () => import('../views/logAudit/error/ErrorLogAudit.vue'),
                meta: {title: '错误日志'},
            },
            {
                path: '/dashboard/actionLogAudit',
                name: 'ActionLogAudit',
                component: () => import('../views/logAudit/action/ActionLogAudit.vue'),
                meta: {title: '操作日志'},
            },
            {
                path: '/dashboard/loginLogAudit',
                name: 'LoginLogAudit',
                component: () => import('../views/logAudit/login/LoginLogAudit.vue'),
                meta: {title: '登录日志'},
            },

            {
                path: '/dashboard/publishNotice',
                name: 'PublishNotice',
                component: () => import('../views/notice/PublishNotice.vue'),
                meta: {title: '发布通知'},
            },
            {
                path: '/dashboard/noticeList',
                name: 'NoticeList',
                component: () => import('../views/notice/NoticeList.vue'),
                meta: {title: '通知列表'},
            },

            {
                path: '/dashboard/settings',
                name: 'Settings',
                component: () => import('../views/Settings/Settings.vue'),
                meta: {title: '系统设置'},
            },
            {
                path: '/dashboard/profile',
                name: 'Profile',
                component: () => import('../views/Profile/Profile.vue'),
                meta: {title: '个人中心'},
            },
            {
                path: '/dashboard/swagger-api-view',
                name: 'SwaggerAPIView',
                component: () => import('../views/swagger/SwaggerAPIView.vue'),
                meta: {title: '接口文档'},
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login/Login.vue'),
        meta: {title: '登录'},
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register/Register.vue'),
        meta: {title: '注册'},
    },
    {
        path: '/forgot-password',
        name: 'Forgot-password',
        component: () => import('../views/Forgot-password/Forgotpassword.vue'),
        meta: {title: '忘记密码'},
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        // 始终滚动到顶部
        return { top: 0 }
    },
})



export default router
