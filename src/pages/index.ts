import { GetStaticProps } from 'next/types'

import { Home, Props } from '../components/pages/Home/Home'
import { requestAllBookSeriesFx } from '../models/bookSeries'
import { requestContactsFx } from '../models/contacts'
import { requestAllFeedbacksFx } from '../models/feedback'
import { requestAllNewsFx } from '../models/news'
import { allSettled, fork, serialize } from 'effector'

export default Home

type Params = {}

export const getStaticProps: GetStaticProps<Props, Params> = async () => {
    const scope = fork()

    await allSettled(requestContactsFx, { scope })
    await allSettled(requestAllBookSeriesFx, { scope })
    await allSettled(requestAllFeedbacksFx, { scope })
    await allSettled(requestAllNewsFx, { scope })

    const effector = serialize(scope)

    return { props: { effector } }
}
