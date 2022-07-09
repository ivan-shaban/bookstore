import { apiClient } from '../lib/apiClient'
import { BookSeries } from '@prisma/client'
import { createEffect, createStore } from 'effector'

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
