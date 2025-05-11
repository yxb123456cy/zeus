// 示例权限（可根据实际业务细化）
import type {Permission, Role} from "../types/rbac.ts";
import type {Department, Employee} from "../types/company.ts";

export const permissions: Permission[] = [
    {id: '1', name: '访问首页', path: '/dashboard/home'},
    {id: '2', name: '查看数据大屏', path: '/dashboard/dataBigScreen'},
    {id: '3', name: '访问员工管理', path: '/dashboard/employeeManagement'},
    {id: '4', name: '访问部门管理', path: '/dashboard/departmentManagement'},
    {id: '5', name: '访问角色管理', path: '/dashboard/roleManagement'},
    {id: '6', name: '访问权限管理', path: '/dashboard/permissionManagement'},
    {id: '7', name: '查看错误日志', path: '/dashboard/errorLogAudit'},
    {id: '8', name: '查看操作日志', path: '/dashboard/actionLogAudit'},
    {id: '9', name: '查看登录日志', path: '/dashboard/loginLogAudit'},
    {id: '10', name: "可以发布通知", path: "/dashboard/publishNotice"},
    {id: '11', name: "可以查看通知列表", path: "/dashboard/noticeList"},
    {id: "12", name: "访问个人中心", path: "/dashboard/profile"},
    {id: "13", name: "访问系统设置", path: "/dashboard/Settings"},
]
const getDepartmentLeaderRolePermissions = () => {
    return permissions.filter(permission => permission.id !== '4' && permission.id !== '5' && permission.id !== '6')
}
const getCommonEmployeeRoleRolePermissions = () => {
    return permissions.filter(permission => permission.id !== '4' && permission.id !== '5' && permission.id !== '6'
        && permission.id !== '2' && permission.id !== '3' && permission.id !== '7'
        && permission.id !== '10'
    )
}
//console.log(getCommonEmployeeRoleRolePermissions());
//console.log(getDepartmentLeaderRolePermissions());
export const adminRole: Role = {
    id: 'r1',
    name: '系统管理员',
    description: '拥有系统全部权限',
    permissions: permissions
}

export const departmentLeaderRole: Role = {
    id: 'r2',
    name: '研发部负责人',
    description: '仅拥有部分日志和人员管理权限',
    permissions: getDepartmentLeaderRolePermissions()
}

export const commonEmployeeRole: Role = {
    id: 'r3',
    name: '普通员工',
    description: '只允许查看首页与部分日志',
    permissions: getCommonEmployeeRoleRolePermissions()
}

// 示例部门
const departments: Department[] = [
    {
        id: 'd1',
        title: '研发部',
        description: '负责开发与维护业务系统'
    }
]
// 示例员工
export const initialEmployees: Employee[] = [
    {
        id: 'u1',
        type: 'admin',
        baseInfo: {
            id: 'u1',
            password: "admin",
            username: 'admin',
            nickname: '系统管理员',
            avatar: 'https://qy-red-book.oss-cn-guangzhou.aliyuncs.com/resources/avatar/67700cbb11c98ab3f5837115.jpg',
            roles: [adminRole]
        }
    },
    {
        id: 'u2',
        type: 'department_leader',
        departmentID: departments[0].id,
        baseInfo: {
            id: 'u2',
            username: 'dev_leader',
            password: "dev_leader",
            nickname: '研发部领导',
            avatar: 'https://qy-red-book.oss-cn-guangzhou.aliyuncs.com/resources/avatar/67700d0411c98ab3f5837116.jpg',
            roles: [departmentLeaderRole]
        }
    },
    {
        id: 'u3',
        type: 'commonEmployee',
        departmentID: 'd1',
        baseInfo: {
            id: 'u3',
            username: 'xiaolin',
            password: "xiaolin",
            nickname: '小林',
            avatar: 'https://qy-red-book.oss-cn-guangzhou.aliyuncs.com/resources/avatar/67700e0411c9a0ef23c5ff09.jpg',
            roles: [commonEmployeeRole]
        }
    }
]