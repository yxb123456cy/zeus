import type {User} from "./rbac.ts";

/**
 * 部门;
 */
export interface Department {
    id: string
    title: string
    description?: string
}

export interface Employee {
    id: string
    type: 'admin'| 'department_leader'| 'commonEmployee'
    baseInfo: User //基本用户信息;
    departmentID?: string //所属部门ID;
}