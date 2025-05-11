
import { faker } from '@faker-js/faker'
import type {Notice} from "../types/notice.ts";

const STATUS = ['草稿', '已发布'] as const
const READ_STATE = ['已读', '未读'] as const

export const mockNotices: Notice[] = Array.from({ length: 200 }, (_, i) => ({
    id: i + 1,
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    publisher: faker.person.fullName(),
    publishTime: faker.date.past().toISOString().slice(0, 19).replace('T', ' '),
    status: STATUS[Math.floor(Math.random() * STATUS.length)],
    readState: READ_STATE[Math.floor(Math.random() * READ_STATE.length)],
}))
console.log(mockNotices);
