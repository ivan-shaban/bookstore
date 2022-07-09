// don't remove this import, it is important for type system
import NextAuth from 'next-auth'

import { Prisma } from '@prisma/client'

declare module 'next-auth' {
    import { UserRole } from '@prisma/client'
    import { DefaultSession } from 'next-auth'

    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            id: string
            role: UserRole
            name: string
        } & DefaultSession['user']
    }

    interface DefaultUser extends Prisma.UserCreateInput {
        id: number
    }
}
