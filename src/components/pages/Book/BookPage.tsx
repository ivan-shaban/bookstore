import { useRouter } from 'next/router'
import React, { FC, memo, useCallback } from 'react'
import { Button } from 'react-bootstrap'

import { pagesPath } from '../../../utils/$path'
import { PageLayout } from '../../PageLayout/PageLayout'
import { Text, TextColors, TextVariant } from '../../Text/Text'
import { Book, BookSeries, FeedbackEntity } from '@prisma/client'

import styles from './BookPage.module.scss'

export interface Props {
    readonly book: Book & {
        readonly series: BookSeries
        readonly feedbacks: FeedbackEntity[]
    }
}

export const BookPage: FC<Props> = memo(function BookPage({
    book: { id, title, rating, shortDescription, longDescription, previewImage, series, feedbacks },
}) {
    const router = useRouter()
    const handleBackClick = useCallback(() => {
        router.push(pagesPath.$url())
    }, [router])

    return (
        <PageLayout
            seoTitle={`Книжная лавка Тумас, книга "${title}"`}
            seoDescription={shortDescription}
            className={styles.base}
        >
            <img className={styles.headerImage} src={previewImage} alt="Превью" />
            <Button variant="text" className={styles.backButton} onClick={handleBackClick}>
                <Text color={TextColors.White}>Назад</Text>
            </Button>
            <Text variant={TextVariant.Title}>{title}</Text>
            <Text>{longDescription}</Text>
        </PageLayout>
    )
})
