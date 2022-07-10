import { GetStaticProps } from 'next/types'

import { Home, Props } from '../components/pages/Home/Home'
import {
    bookSeriesController,
    contactsController,
    feedbacksController,
    newsController,
} from '../server/controllers'
import { serializeDate } from '../utils/prisma'

export default Home

type Params = {}

export const getStaticProps: GetStaticProps<Props, Params> = async () => {
    const contacts = await contactsController.getEntity()
    const bookSeries = await bookSeriesController.getAll()
    const feedbacks = await feedbacksController.getAll()
    const news = await newsController.getAll()

    return {
        props: {
            contacts: serializeDate(contacts!),
            bookSeries: serializeDate(bookSeries!),
            feedbacks: serializeDate(feedbacks!),
            news: serializeDate(news!),
        },
    }
}
