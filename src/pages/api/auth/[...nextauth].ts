import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

import prisma from '../../../lib/prisma'
import { pagesPath } from '../../../utils/$path'
import faker from '@faker-js/faker'

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            profile: async (p) => {
                // {
                //   login: 'i-shaban-sloboda',
                //   id: 101095965,
                //   node_id: 'U_kgDOBgaaHQ',
                //   avatar_url: 'https://avatars.githubusercontent.com/u/101095965?v=4',
                //   gravatar_id: '',
                //   url: 'https://api.github.com/users/i-shaban-sloboda',
                //   html_url: 'https://github.com/i-shaban-sloboda',
                //   followers_url: 'https://api.github.com/users/i-shaban-sloboda/followers',
                //   following_url: 'https://api.github.com/users/i-shaban-sloboda/following{/other_user}',
                //   gists_url: 'https://api.github.com/users/i-shaban-sloboda/gists{/gist_id}',
                //   starred_url: 'https://api.github.com/users/i-shaban-sloboda/starred{/owner}{/repo}',
                //   subscriptions_url: 'https://api.github.com/users/i-shaban-sloboda/subscriptions',
                //   organizations_url: 'https://api.github.com/users/i-shaban-sloboda/orgs',
                //   repos_url: 'https://api.github.com/users/i-shaban-sloboda/repos',
                //   events_url: 'https://api.github.com/users/i-shaban-sloboda/events{/privacy}',
                //   received_events_url: 'https://api.github.com/users/i-shaban-sloboda/received_events',
                //   type: 'User',
                //   site_admin: false,
                //   name: null,
                //   company: null,
                //   blog: '',
                //   location: null,
                //   email: 'i.shaban@sloboda-studio.com',
                //   hireable: null,
                //   bio: 'Typescript enjoyer',
                //   twitter_username: null,
                //   public_repos: 1,
                //   public_gists: 0,
                //   followers: 1,
                //   following: 0,
                //   created_at: '2022-03-07T09:00:42Z',
                //   updated_at: '2022-06-23T18:08:43Z'
                // }

                return {
                    // @ts-ignore
                    id: p.id!,
                    firstName: faker.name.firstName(),
                    lastName: faker.name.lastName(),
                    email: p.email,
                    phone: faker.phone.phoneNumber('+375 29 ### ## ##'),
                    emailVerified: null,
                }
            },
        }),
    ],
    // pages: {
    //     signIn: pagesPath.login.$url().pathname,
    // },
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.id = user.id
            }
            return token
        },
        session: ({ session, user }) => {
            if (user) {
                session.user.id = user.id
                session.user.role = user.role
                session.user.name = user.firstName + user.lastName
            }
            return session
        },
    },
    session: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    debug: false,
    // debug: process.env.NODE_ENV === 'development',
}

export default NextAuth(authOptions)
