import { GetStaticProps } from 'next/types'

import { NewsPage, Props } from '../../components/pages/News/NewsPage'
import { newsController } from '../../server/controllers'
import { serializeDate } from '../../utils/prisma'

export default NewsPage

type Params = {}

export const getStaticProps: GetStaticProps<Props, Params> = async () => {
    const news = await newsController.getAll()

    return { props: { news: serializeDate(news) } }
}
