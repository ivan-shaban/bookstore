import { apiClient } from '../lib/apiClient'
import { NewsEntity } from '@prisma/client'
import { createEffect, createStore } from 'effector'

export const requestAllNewsFx = createEffect({
    name: 'request all news',
    handler: async () => {
        return apiClient.get<NewsEntity[]>(`/api/news`)
    },
})

export const $news = createStore<NewsEntity[]>([]).on(
    requestAllNewsFx.doneData,
    (_, { data }) => data,
)
