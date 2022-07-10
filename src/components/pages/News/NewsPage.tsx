import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { MouseEvent, memo, useCallback } from 'react'

import { pagesPath } from '../../../utils/$path'
import { PageLayout } from '../../PageLayout/PageLayout'
import { Text, TextColors, TextVariant } from '../../Text/Text'
import { AuthorContacts, NewsEntity } from '@prisma/client'
import moment from 'moment'

import styles from './NewsPage.module.scss'

export interface Props {
    readonly contacts: AuthorContacts
    readonly news: NewsEntity[]
}

export const NewsPage: NextPage<Props> = memo(({ news, contacts }) => {
    const router = useRouter()
    const handleNewsEntityClick = useCallback(
        (event: MouseEvent<HTMLDivElement>) => {
            const newsEntityId = event.currentTarget.dataset.id!
            router.push(pagesPath.news._id(newsEntityId).$url())
        },
        [router],
    )

    return (
        <PageLayout
            seoTitle="Книжная лавка Тумас, новости"
            seoDescription="News page"
            contacts={contacts}
        >
            <div className={styles.base}>
                {news.map(({ id, shortTitle, createdAt }) => (
                    <div
                        className={styles.newsItem}
                        data-id={id}
                        key={id}
                        onClick={handleNewsEntityClick}
                    >
                        <div className={styles.newsItem_date}>
                            <Text variant={TextVariant.Label} color={TextColors.Grey}>
                                {moment(createdAt).format('DD.MM.YYYY')}
                            </Text>
                        </div>
                        <div>
                            <Text>{shortTitle}</Text>
                            <Text color={TextColors.Secondary}>Read more</Text>
                        </div>
                    </div>
                ))}
            </div>
        </PageLayout>
    )
})
