export interface ErrorLog {
    id: string
    timestamp: string
    level: 'ERROR' | 'WARN' | 'INFO'
    message: string
    file: string
    line: number
    stackTrace: string
}

export interface ActionLog {
    id: string
    user: string
    role: '管理员' | '部门主管' | '普通员工'
    action: '新增' | '删除' | '修改' | '查询'
    target: string
    ip: string
    timestamp: string
}

export interface LoginLog {
    id: string
    user: string
    role: '管理员' | '部门主管' | '普通员工'
    ip: string
    location: string
    device: string
    timestamp: string
    status: '成功' | '失败'
}
