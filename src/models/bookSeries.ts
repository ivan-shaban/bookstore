import { apiClient } from '../lib/apiClient'
import { Book, BookSeries as BookSeriesOrigin } from '@prisma/client'
import { createEffect, createStore } from 'effector'

export type BookSeries = BookSeriesOrigin & {
    books: Book[]
}

export const requestAllBookSeriesFx = createEffect({
    name: 'request all book series',
    handler: async () => {
        return apiClient.get<BookSeries[]>(`/api/bookSeries`)
    },
})

export const $bookSeries = createStore<BookSeries[]>([]).on(
    requestAllBookSeriesFx.doneData,
    (_, { data }) => data,
)
