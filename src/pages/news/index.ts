import { GetStaticProps } from 'next/types'

import { NewsPage, Props } from '../../components/pages/News/NewsPage'
import { contactsController, newsController } from '../../server/controllers'
import { serializeDate } from '../../utils/prisma'

export default NewsPage

type Params = {}

export const getStaticProps: GetStaticProps<Props, Params> = async () => {
    const news = await newsController.getAll()
    const contacts = await contactsController.getEntity()

    return {
        props: {
            news: serializeDate(news),
            contacts: serializeDate(contacts!),
        },
    }
}
