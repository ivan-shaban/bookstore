import prisma from '../../lib/prisma'
import { BookSeries } from '@prisma/client'

export class BookSeriesController {
    public getAll(includeBooks: boolean = true, includeFeedbacks: boolean = false) {
        return prisma.bookSeries.findMany({
            include: {
                books: includeBooks,
                feedbacks: includeFeedbacks,
            },
        })
    }

    public async getById(
        id: BookSeries['id'],
        includeBooks: boolean = true,
        includeFeedbacks: boolean = false,
    ) {
        return prisma.bookSeries.findFirst({
            where: {
                id,
            },
            include: {
                books: includeBooks,
                feedbacks: includeFeedbacks,
            },
        })
    }
}
