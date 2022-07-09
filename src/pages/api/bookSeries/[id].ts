import type { NextApiRequest, NextApiResponse } from 'next'

import { bookSeriesController } from '../../../server/controllers'
import { withDefaultErrorHandling } from '../../../utils/api'
import { StatusCodes } from 'http-status-codes'

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            const bookSeriasId = req.query.id! as string
            const oneBookSerias = await bookSeriesController.getById(bookSeriasId)

            return res.status(StatusCodes.OK).json(oneBookSerias)
        }
        default: {
            return res.status(StatusCodes.METHOD_NOT_ALLOWED)
        }
    }
}

export default withDefaultErrorHandling(handler)
