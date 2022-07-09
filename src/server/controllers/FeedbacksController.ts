import prisma from '../../lib/prisma'
import { FeedbackEntity } from '@prisma/client'

export class FeedbacksController {
    public getAll() {
        return prisma.feedbackEntity.findMany({
            include: {
                book: true,
                user: true,
                series: true,
            },
        })
    }

    public getById(id: FeedbackEntity['id']) {
        return prisma.feedbackEntity.findFirst({
            where: {
                id,
            },
            include: {
                book: true,
                user: true,
                series: true,
            },
        })
    }
}
