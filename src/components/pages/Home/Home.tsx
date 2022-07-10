import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { MouseEvent, useCallback } from 'react'
import { Button, Card } from 'react-bootstrap'

import { BookSeries } from '../../../models/bookSeries'
import { pagesPath, staticPath } from '../../../utils/$path'
import { PageLayout } from '../../PageLayout/PageLayout'
import { AuthorContacts, FeedbackEntity, NewsEntity } from '@prisma/client'

import styles from './Home.module.scss'

export interface Props {
    readonly contacts: AuthorContacts
    readonly bookSeries: BookSeries[]
    readonly feedbacks: FeedbackEntity[]
    readonly news: NewsEntity[]
}

export const Home: NextPage<Props> = ({ news, feedbacks, bookSeries, contacts }) => {
    const router = useRouter()
    const handleBookNavigationClick = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            const bookId = event.currentTarget.dataset.id!
            router.push(pagesPath.books._id(bookId).$url())
        },
        [router],
    )

    return (
        <PageLayout seoTitle="Книжная лавка Тумас" seoDescription="Home" contacts={contacts}>
            <div className="rounded-3 mb-4 overflow-hidden" style={{ height: 400 }}>
                <img
                    className={styles.headerBackground}
                    src={staticPath.images.home_header_background_jpg}
                    alt="header-background"
                />
            </div>
            <h1 className="text-center">Книги</h1>
            <ul className="mb-4">
                {bookSeries.map(({ id, title, rating, books }) => (
                    <li className={styles.seriesItem} key={id}>
                        <h4 className="text-center">Серия: {title}</h4>
                        <div className={styles.booksList}>
                            {books.map((book) => (
                                <Card className={styles.bookCard} key={book.id}>
                                    <Card.Img variant="top" src={book.previewImage} />
                                    <Card.Body className={styles.bookCard_body}>
                                        <Card.Title>{book.title}</Card.Title>
                                        <Card.Text>{book.shortDescription}</Card.Text>
                                        <Button
                                            variant="primary"
                                            className="mt-auto me-auto"
                                            data-id={book.id}
                                            onClick={handleBookNavigationClick}
                                        >
                                            Узнать больше
                                        </Button>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
            <hr />
            <h3 className="text-center">{contacts.catchphrase}</h3>
        </PageLayout>
    )
}
