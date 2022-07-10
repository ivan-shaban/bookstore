import { GetStaticPaths, GetStaticProps } from 'next/types'

import { NewsEntityPage, Props } from '../../components/pages/NewsEntity/NewsEntityPage'
import { contactsController, newsController } from '../../server/controllers'
import { serializeDate } from '../../utils/prisma'

export default NewsEntityPage

type Params = { id: string }

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const news = await newsController.getAll()

    return {
        paths: news.map(({ id }) => ({ params: { id } })),
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
    const newsId = params?.id!
    const newsEntity = await newsController.getById(newsId)
    const contacts = await contactsController.getEntity()

    return {
        props: {
            newsEntity: serializeDate(newsEntity!),
            contacts: serializeDate(contacts!),
        },
    }
}
