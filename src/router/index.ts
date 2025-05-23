import {createRouter, createWebHistory} from 'vue-router'
import type {RouteRecordRaw} from 'vue-router'
import {useUserStateStore} from "../stores/userState.ts";
import type {Employee} from "../types/company.ts";
import setPageTitle from "../utils/DocumentTitleUtil.ts";

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
                meta: {title: 'Zeus系统首页'},

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
            {
                path: '/dashboard/iframe/:id',
                name: 'MyIframe',
                component: () => import('../views/Iframe/MyIframe.vue'),
                meta: {title: '内嵌网页'},
            },
            {
                path: '/dashboard/403',
                name: '403',
                component: () => import('../views/403/Forbidden.vue'),
                meta: {title: '403-forbidden'},
            },

        ]
    },
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import('../views/404/NotFound.vue'),
        meta: {title: '404-NotFound'},
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
        return {top: 0}
    },
})

router.onError(err => {
    console.error('Vue-Router error:', err)
})
router.beforeEach(async (to, _) => {
    /**
     * Pinia中的组合式API可以在函数中使用?
     */
    const userStateStore = useUserStateStore();
    const checkPermission = (r: string, e: Employee | null): boolean | undefined => {
        return e?.baseInfo.roles[0]
            .permissions.some(p => p.path === r);
    }
    if (
        // 检查用户是否已登录
        userStateStore.isLogin === false &&
        // ❗️ 避免无限重定向
        to.name !== 'Login' && to.name !== 'Register' && to.name !== 'Forgot-password'
        && to.name !== '404'
    ) {
        // 将用户重定向到登录页面
        return {name: 'Login'}
    }
    //登录且Path为系统后台相关;
    if (
        // 检查用户是否已登录
        userStateStore.isLogin &&
        // ❗️ 避免无限重定向
        to.name !== 'Login' && to.name !== 'Register' && to.name !== 'Forgot-password'
        && to.name !== '403' && to.name !== '404'
    ) {
        const permission = checkPermission(to.path, userStateStore.getCurrentUser.value);
        if (permission === undefined || !permission) return {name: '403'};
    }

})
/**
 * 全局路由后置钩子;
 */
router.afterEach((to, _) => {
    setPageTitle(to.fullPath);
})
export default router
