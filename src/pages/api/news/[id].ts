import type { NextApiRequest, NextApiResponse } from 'next'

import { newsController } from '../../../server/controllers'
import { withDefaultErrorHandling, withProtection } from '../../../utils/api'
import { StatusCodes } from 'http-status-codes'

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            const newsEntityId = req.query.id as string
            const newsEntity = await newsController.getById(newsEntityId)

            return res.status(StatusCodes.OK).json(newsEntity)
        }
        default: {
            return res.status(StatusCodes.METHOD_NOT_ALLOWED)
        }
    }
}

export default withDefaultErrorHandling(withProtection(handler))
