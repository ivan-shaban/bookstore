import { GetStaticPaths, GetStaticProps } from 'next/types'

import { BookPage, Props } from '../../components/pages/Book/BookPage'
import { booksController } from '../../server/controllers'
import { serializeDate } from '../../utils/prisma'

export default BookPage

type Params = { id: string }

/**
 * Можем ли мы генерировать список недвижимости заранее или там есть динамические данные которые меняются
 * довольно часто? например сколько выкупили
 */
export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const books = await booksController.getAll()

    return {
        paths: books.map(({ id }) => ({ params: { id: id } })),
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
    const bookId = params?.id!
    const book = await booksController.getById(bookId, true, true)

    return {
        props: {
            book: serializeDate(book!),
        },
    }
}
