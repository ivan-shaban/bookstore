import prisma from '../../lib/prisma'
import { User } from '@prisma/client'

export class UsersController {
    public getAll() {
        return prisma.user.findMany()
    }

    public getById(id: User['id']) {
        return prisma.user.findFirst({
            where: {
                id,
            },
        })
    }

    public deleteById(userId: User['id']) {
        return prisma.user.delete({
            where: {
                id: userId,
            },
        })
    }
}
