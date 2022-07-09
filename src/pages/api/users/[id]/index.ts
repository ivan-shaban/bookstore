import type { NextApiRequest, NextApiResponse } from 'next'

import { withDefaultErrorHandling, withProtection } from '../../../../utils/api'
import { StatusCodes } from 'http-status-codes'

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        // case 'GET': {
        //     // TODO: add validation
        //     const userId = req.query.id as string
        //     const user = await usersController.getById(userId)
        //
        //     return res.status(StatusCodes.OK).json(user)
        // }
        // case 'PATCH': {
        //     // TODO: add validation
        //     const userId = req.query.id as string
        //     // const user = await usersController.updateById(userId, req.body)
        //
        //     return res.status(StatusCodes.OK).json(user)
        // }
        // case 'DELETE': {
        //     // TODO: add validation
        //     // TODO: check that password correct
        //     const userId = req.query.id as string
        //     const user = await usersController.deleteById(userId)
        //
        //     return res.status(StatusCodes.OK).json(user)
        // }
        default: {
            return res.status(StatusCodes.METHOD_NOT_ALLOWED)
        }
    }
}

export default withDefaultErrorHandling(withProtection(handler))
