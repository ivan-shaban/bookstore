import { apiClient } from '../lib/apiClient'
import { FeedbackEntity } from '@prisma/client'
import { createEffect, createStore } from 'effector'

export const requestAllFeedbacksFx = createEffect({
    name: 'request all feedbacks',
    handler: async () => {
        return apiClient.get<FeedbackEntity[]>(`/api/feedback`)
    },
})

export const $feedbacks = createStore<FeedbackEntity[]>([]).on(
    requestAllFeedbacksFx.doneData,
    (_, { data }) => data,
)
