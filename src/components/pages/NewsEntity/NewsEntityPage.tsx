import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { memo, useCallback } from 'react'

import { pagesPath } from '../../../utils/$path'
import { PageLayout } from '../../PageLayout/PageLayout'
import { Text, TextColors, TextVariant } from '../../Text/Text'
import { NewsEntity } from '@prisma/client'
import moment from 'moment'

import styles from './NewsEntityPage.module.scss'

export interface Props {
    readonly newsEntity: NewsEntity
}

export const NewsEntityPage: NextPage<Props> = memo(
    ({ newsEntity: { title, content, createdAt } }) => {
        const router = useRouter()
        const handleBackClick = useCallback(() => {
            router.push(pagesPath.news.$url())
        }, [router])

        return (
            <PageLayout seoTitle="Step Invest: NEWS" seoDescription="News page">
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
