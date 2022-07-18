import Head from 'next/head'
import React, { FC, PropsWithChildren, memo } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

import classNames from 'classnames'

import { pagesPath, staticPath } from '../../utils/$path'
import { AuthorContacts } from '@prisma/client'

import styles from './PageLayout.module.scss'

export interface Props {
    readonly contacts: AuthorContacts
    readonly seoTitle: string
    readonly seoDescription: string
}

export const PageLayout: FC<PropsWithChildren<Props>> = memo(
    ({
        children,
        seoTitle,
        seoDescription,
        contacts: { facebook, instagram, twitter, telegram },
    }) => {
        const baseClasses = classNames(styles.base, styles.base__stretched)

        return (
            <div className={baseClasses}>
                <Head>
                    <title>{seoTitle}</title>
                    <meta name="description" content={seoDescription} />
                </Head>
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
                        <Nav className="me-auto d-none d-sm-flex">
                            <Nav.Link href={pagesPath.$url().pathname}>Книги</Nav.Link>
                            <Nav.Link href={pagesPath.news.$url().pathname}>Новости</Nav.Link>
                            <Nav.Link href={pagesPath.$url().pathname}>Отзывы</Nav.Link>
                        </Nav>
                        <Nav className="d-none d-md-flex">
                            <Nav.Link href={instagram} target="_blank">
                                <i className="bi bi-instagram" />
                            </Nav.Link>
                            <Nav.Link href={facebook} target="_blank">
                                <i className="bi bi-facebook" />
                            </Nav.Link>
                            <Nav.Link href={telegram} target="_blank">
                                <i className="bi bi-telegram" />
                            </Nav.Link>
                            <Nav.Link href={twitter} target="_blank">
                                <i className="bi bi-twitter" />
                            </Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                <Container className="mt-4 mb-4">{children}</Container>
                <footer className="p-3 m-4 text-muted border-top text-center">© 2022</footer>
            </div>
        )
    },
)
