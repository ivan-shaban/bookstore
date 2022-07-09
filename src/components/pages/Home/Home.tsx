import { useStore } from 'effector-react'
import { NextPage } from 'next'
import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

import { $bookSeries } from '../../../models/bookSeries'
import { $contacts } from '../../../models/contacts'
import { $feedbacks } from '../../../models/feedback'
import { $news } from '../../../models/news'
import { pagesPath, staticPath } from '../../../utils/$path'
import { PageLayout } from '../../PageLayout/PageLayout'
import { Text } from '../../Text/Text'

import styles from './Home.module.scss'

export interface Props {}

export const Home: NextPage<Props> = (props) => {
    const bookSeries = useStore($bookSeries)
    const { facebook, instagram, twitter, telegram, vkontakte, catchphrase } = useStore($contacts)
    const feedbacks = useStore($feedbacks)
    const news = useStore($news)

    return (
        <PageLayout seoTitle="Книжная лавка Тумас" seoDescription="Home" className={styles.base}>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href={pagesPath.$url().pathname}>
                        <img
                            src={staticPath.images.logo_svg}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="logo"
                        />{' '}
                        Книжная лавка Тумас
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href={pagesPath.$url().pathname}>Книги</Nav.Link>
                        <Nav.Link href={pagesPath.news.$url().pathname}>Новости</Nav.Link>
                        <Nav.Link href={pagesPath.$url().pathname}>Отзывы</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href={instagram}>
                            <i className="bi bi-instagram" />
                        </Nav.Link>
                        <Nav.Link href={facebook}>
                            <i className="bi bi-facebook" />
                        </Nav.Link>
                        <Nav.Link href={telegram}>
                            <i className="bi bi-telegram" />
                        </Nav.Link>
                        <Nav.Link href={twitter}>
                            <i className="bi bi-twitter" />
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <img
                className={styles.headerBackground}
                src={staticPath.images.home_header_background_jpg}
                alt="header-background"
            />
            <Container>
                <ul>
                    {bookSeries.map(({ id, title, rating }) => (
                        <li key={id}>
                            <Text>
                                {title} / {rating}
                            </Text>
                        </li>
                    ))}
                </ul>
            </Container>
        </PageLayout>
    )
}
