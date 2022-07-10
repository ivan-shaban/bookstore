import React, { FC, memo } from 'react'

import classNames from 'classnames'

import { PageLayout } from '../../PageLayout/PageLayout'
import { Text, TextVariant } from '../../Text/Text'
import { AuthorContacts, Book, BookSeries, FeedbackEntity } from '@prisma/client'

import styles from './BookPage.module.scss'

export interface Props {
    readonly contacts: AuthorContacts
    readonly book: Book & {
        readonly series: BookSeries
        readonly feedbacks: FeedbackEntity[]
    }
}

export const BookPage: FC<Props> = memo(function BookPage({
    contacts,
    book: { id, title, rating, shortDescription, longDescription, previewImage, series, feedbacks },
}) {
    return (
        <PageLayout
            contacts={contacts}
            seoTitle={`Книжная лавка Тумас, книга "${title}"`}
            seoDescription={shortDescription}
        >
            <div className={styles.content}>
                <img
                    className={classNames(styles.headerImage, 'rounded-3')}
                    src={previewImage}
                    alt="Превью"
                />
                <div className="ms-4">
                    <Text className="mb-4" variant={TextVariant.Title}>
                        {title}
                    </Text>
                    <p className="text-muted">rating here</p>
                    <Text>{longDescription}</Text>
                </div>
            </div>
        </PageLayout>
    )
})
