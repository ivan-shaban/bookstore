import { authOptions } from '../pages/api/auth/[...nextauth]'
import { GetServerSideProps } from 'next'
import { unstable_getServerSession } from 'next-auth/next'

import { apiClient } from '../lib/apiClient'
import { pagesPath } from './$path'
import { ParsedUrlQuery } from 'querystring'

export const withProtection =
    <P, Q extends ParsedUrlQuery = ParsedUrlQuery>(
        callback: GetServerSideProps<P, Q>,
    ): GetServerSideProps<P, Q> =>
    async (context) => {
        const session = await unstable_getServerSession(context.req, context.res, authOptions)

        if (!session) {
            return {
                redirect: {
                    destination: 'pagesPath.login.$url().pathname',
                    permanent: false,
                },
            }
        }

        // if page with protection so we may do requests to protection API, so pass credentials
        // @ts-ignore
        apiClient.defaults.headers.common.cookie = context.req.headers.cookie
        return callback(context)
    }

export const withoutProtection =
    (callback: GetServerSideProps): GetServerSideProps =>
    async (context) => {
        const session = await unstable_getServerSession(context.req, context.res, authOptions)

        return session
            ? {
                  redirect: {
                      destination: 'pagesPath.dashboard.$url().pathname',
                      permanent: false,
                  },
              }
            : await callback(context)
    }
