export interface Notice {
    id: number
    title: string
    content: string
    publisher: string
    publishTime: string
    status: '草稿' | '已发布'
    readState: '已读' | '未读'
}
