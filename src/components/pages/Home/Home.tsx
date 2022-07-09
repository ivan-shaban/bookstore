import { useStore } from 'effector-react'
import { NextPage } from 'next'
import React from 'react'

import { $bookSeries } from '../../../models/bookSeries'
import { $contacts } from '../../../models/contacts'
import { $feedbacks } from '../../../models/feedback'
import { $news } from '../../../models/news'
import { PageLayout } from '../../PageLayout/PageLayout'
import { Text } from '../../Text/Text'

import styles from './Home.module.scss'

export interface Props {}

export const Home: NextPage<Props> = (props) => {
    const bookSeries = useStore($bookSeries)
    const contacts = useStore($contacts)
    const feedbacks = useStore($feedbacks)
    const news = useStore($news)

    return (
        <PageLayout seoTitle="Книжная лавка Тумас" seoDescription="Home" className={styles.base}>
            <ul>
                {bookSeries.map(({ id, title, rating }) => (
                    <li key={id}>
                        <Text>
                            {title} / {rating}
                        </Text>
                    </li>
                ))}
            </ul>
        </PageLayout>
    )
}
