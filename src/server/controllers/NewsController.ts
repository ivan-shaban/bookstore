import prisma from '../../lib/prisma'
import { NewsEntity } from '@prisma/client'

export class NewsController {
    public getAll() {
        return prisma.newsEntity.findMany()
    }

    public getById(id: NewsEntity['id']) {
        return prisma.newsEntity.findFirst({
            where: {
                id,
            },
        })
    }
}
