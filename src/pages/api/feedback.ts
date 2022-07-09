import type { NextApiRequest, NextApiResponse } from 'next'

import { feedbacksController } from '../../server/controllers'
import { withDefaultErrorHandling } from '../../utils/api'
import { StatusCodes } from 'http-status-codes'

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            const feedbacks = await feedbacksController.getAll()

            return res.status(StatusCodes.OK).json(feedbacks)
        }
        default: {
            return res.status(StatusCodes.METHOD_NOT_ALLOWED)
        }
    }
}

export default withDefaultErrorHandling(handler)
