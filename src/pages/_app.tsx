import { Provider as EffectorProvider } from 'effector-react/scope'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import { SSRProvider } from 'react-bootstrap'

import { InitEffector } from '../components/InitEffector/InitEffector'
import '../models'
import { useScope } from '../scope'

import '../styles/globals.scss'

export interface Props extends AppProps {}

function MyApp({
    Component,
    pageProps: { session, effector, locale, localeMessages, ...pageProps },
}: Props) {
    const scope = useScope(effector)

    return (
        <EffectorProvider value={scope}>
            <SessionProvider session={session}>
                <SSRProvider>
                    <Head>
                        <meta name="viewport" content="initial-scale=1, width=device-width" />
                    </Head>
                    <Component {...pageProps} />
                    <InitEffector />
                </SSRProvider>
            </SessionProvider>
        </EffectorProvider>
    )
}

export default MyApp
