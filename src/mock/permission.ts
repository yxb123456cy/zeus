import type {Permission} from "../types/rbac.ts";

export const mockPermissions: Permission[] = [
    {id: '1', name: '访问首页', path: '/dashboard/home',description:"具有访问首页的权限"},
    {id: '2', name: '查看数据大屏', path: '/dashboard/dataBigScreen',description:"具有查看数据大屏的权限"},
    {id: '3', name: '访问员工管理', path: '/dashboard/employeeManagement',description:"具有访访问员工管理的权限"},
    {id: '4', name: '访问部门管理', path: '/dashboard/departmentManagement',description:"具有访问部门管理的权限"},
    {id: '5', name: '访问角色管理', path: '/dashboard/roleManagement',description:"具有访问角色管理的权限"},
    {id: '6', name: '访问权限管理', path: '/dashboard/permissionManagement',description:"具有访问权限管理的权限"},
    {id: '7', name: '查看错误日志', path: '/dashboard/errorLogAudit',description:"具有查看错误日志的权限"},
    {id: '8', name: '查看操作日志', path: '/dashboard/actionLogAudit',description:"具有查看操作日志的权限"},
    {id: '9', name: '查看登录日志', path: '/dashboard/loginLogAudit',description:"具有查看登录日志的权限"},
    {id: '10', name: "可以发布通知", path: "/dashboard/publishNotice",description:"具有可以发布通知的权限"},
    {id: '11', name: "可以查看通知列表", path: "/dashboard/noticeList",description:"具有可以查看通知列表的权限"},
    {id: "12", name: "访问个人中心", path: "/dashboard/profile",description:"具有访问个人中心的权限"},
    {id: "13", name: "访问系统设置", path: "/dashboard/settings",description:"具有访问系统设置的权限"},
    {id: "14", name: "访问Zeus项目接口文档", path: "/dashboard/swagger-api-view",description:"具有访问Zeus项目接口文档的权限"},
    {id: "15", name: "访问DockerUi内嵌网页", path: "/dashboard/iframe/docker-dashboard.pages.dev",description:"具有访问DockerUi内嵌网页的权限"},
    {id: "16", name: "访问问卷喵内嵌网页", path: "/dashboard/iframe/qy-questionnaire.vercel.app",description:"具有访问问卷喵内嵌网页的权限"},
    {id: "17", name: "访问轻叶壁纸内嵌网页", path: "/dashboard/iframe/qy-wallpaper.vercel.app",description:"具有访问轻叶壁纸内嵌网页的权限"},
]