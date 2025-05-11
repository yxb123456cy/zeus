export interface Permission {
    id: string
    name: string  //权限名称;
    path?: string  // 唯一标识 表示一个路径 可选项;
    description?: string
}

export interface Role {
    id: string
    name: string
    description?: string
    permissions: Permission[]
}

export interface User {
    id: string
    username: string
    password: string
    nickname?: string
    avatar?: string
    roles: Role[]
}