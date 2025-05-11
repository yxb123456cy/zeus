const map: Map<string, string> = new Map<string, string>();
map.set('/dashboard/home', 'Zeus系统首页');
map.set('/dashboard/dataBigScreen', '数据大屏');
map.set('/dashboard/employeeManagement', '员工管理');
map.set('/dashboard/departmentManagement', '部门管理');
map.set('/dashboard/roleManagement', '角色管理');
map.set('/dashboard/permissionManagement', '权限管理');
map.set('/dashboard/errorLogAudit', '错误日志');
map.set('/dashboard/actionLogAudit', '操作日志');
map.set('/dashboard/loginLogAudit', '登录日志');
map.set('/dashboard/publishNotice', '发布通知');
map.set('/dashboard/noticeList', '通知列表');
map.set('/dashboard/profile', '个人中心');
map.set('/dashboard/settings', '系统设置');
map.set('/login', '登录');
map.set('/register', '注册');
map.set('/forgot-password', '忘记密码');
map.set('/dashboard/swagger-api-view', 'Zeus项目接口文档');
map.set('/dashboard/403', 'Forbidden');

export default function setPageTitle(key: string) {
    document.title = map.get(key)??"";
}



