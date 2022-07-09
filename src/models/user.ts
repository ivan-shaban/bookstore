import { apiClient } from '../lib/apiClient'
import { User } from '@prisma/client'
import { createEffect, createStore } from 'effector'

export const requestUserFx = createEffect({
    name: 'request user',
    handler: async (id: string) => {
        return apiClient.get<User>(`/api/users/${id}`)
    },
})

export const $user = createStore<User>({} as User).on(requestUserFx.doneData, (_, { data }) => data)
