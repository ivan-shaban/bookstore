import prisma from '../../lib/prisma'
import { Book } from '@prisma/client'

export class BooksController {
    public getAll(includeSeries: boolean = false, includeFeedbacks: boolean = false) {
        return prisma.book.findMany({
            include: {
                feedbacks: includeFeedbacks,
                series: includeSeries,
            },
        })
    }

    public async getById(
        id: Book['id'],
        includeSeries: boolean = true,
        includeFeedbacks: boolean = false,
    ) {
        return prisma.book.findFirst({
            where: {
                id,
            },
            include: {
                feedbacks: includeFeedbacks,
                series: includeSeries,
            },
        })
    }
}
