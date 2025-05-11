import type {ActionLog, ErrorLog, LoginLog} from "../types/log";
import {faker} from '@faker-js/faker'

export const mockErrorLogs: ErrorLog[] = Array.from({length: 200}, () => ({
    id: faker.string.uuid(),
    timestamp: faker.date.past().toISOString().slice(0, 19).replace('T', ' '),
    level: faker.helpers.arrayElement(['ERROR', 'WARN', 'INFO']),
    message: faker.lorem.sentence(),
    file: `${faker.word.noun()}.ts`,
    line: faker.number.int({min: 1, max: 500}),
    stackTrace: faker.lorem.paragraphs(2),
}))

export const mockActionLogs: ActionLog[] = Array.from({length: 200}, () => ({
    id: faker.string.uuid(),
    user: faker.person.fullName(),
    role: faker.helpers.arrayElement(['管理员', '部门主管', '普通员工']),
    action: faker.helpers.arrayElement(['新增', '删除', '修改', '查询']),
    target: faker.word.words({count: {min: 1, max: 3}}),
    ip: faker.internet.ipv4(),
    timestamp: faker.date.past().toISOString().slice(0, 19).replace('T', ' '),
}))

export const mockLoginLogs: LoginLog[] = Array.from({length: 200}, () => ({
    id: faker.string.uuid(),
    user: faker.person.fullName(),
    role: faker.helpers.arrayElement(['管理员', '部门主管', '普通员工']),
    ip: faker.internet.ipv4(),
    location: faker.location.city(),
    device: faker.internet.userAgent(),
    timestamp: faker.date.past().toISOString().slice(0, 19).replace('T', ' '),
    status: faker.helpers.arrayElement(['成功', '失败']),
}))
