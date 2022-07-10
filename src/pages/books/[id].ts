import { GetStaticPaths, GetStaticProps } from 'next/types'

import { BookPage, Props } from '../../components/pages/Book/BookPage'
import { booksController, contactsController } from '../../server/controllers'
import { serializeDate } from '../../utils/prisma'

export default BookPage

type Params = { id: string }

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
    const contacts = await contactsController.getEntity()

    return {
        props: {
            book: serializeDate(book!),
            contacts: serializeDate(contacts!),
        },
    }
}
