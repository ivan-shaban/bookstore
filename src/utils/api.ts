import { authOptions } from '../pages/api/auth/[...nextauth]'
import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { NextApiHandler } from 'next/dist/shared/lib/utils'

import { StatusCodes } from 'http-status-codes'

export const withDefaultErrorHandling =
    (endpoint: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            return endpoint(req, res)
        } catch (e) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
        }
    }

export const withProtection =
    (endpoint: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
        const session = await unstable_getServerSession(req, res, authOptions)

        if (!session) {
            return res.status(StatusCodes.UNAUTHORIZED).end()
        }

        return endpoint(req, res)
    }
