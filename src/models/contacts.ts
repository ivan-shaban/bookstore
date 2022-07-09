import { apiClient } from '../lib/apiClient'
import { AuthorContacts } from '@prisma/client'
import { createEffect, createStore } from 'effector'

export const requestContactsFx = createEffect({
    name: 'request contacts data',
    handler: async () => {
        return apiClient.get<AuthorContacts>(`/api/contacts`)
    },
})

export const $contacts = createStore<AuthorContacts>({} as AuthorContacts).on(
    requestContactsFx.doneData,
    (_, { data }) => data,
)
