import { NextPage } from 'next'
import React, { memo } from 'react'

import { PageLayout } from '../../PageLayout/PageLayout'
import { Text, TextColors, TextVariant } from '../../Text/Text'
import { AuthorContacts, NewsEntity } from '@prisma/client'
import moment from 'moment'

import styles from './NewsEntityPage.module.scss'

export interface Props {
    readonly contacts: AuthorContacts
    readonly newsEntity: NewsEntity
}

export const NewsEntityPage: NextPage<Props> = memo(
    ({ newsEntity: { title, content, createdAt }, contacts }) => {
        return (
            <PageLayout seoTitle="Step Invest: NEWS" seoDescription="News page" contacts={contacts}>
                <div className={styles.base}>
                    <p className={styles.date}>{moment(createdAt).format('DD.MM.YYYY')}</p>
                    <Text variant={TextVariant.Header}>{title}</Text>
                    <Text className="mt-4" color={TextColors.Grey}>
                        {content}
                    </Text>
                </div>
            </PageLayout>
        )
    },
)
