import Head from 'next/head'
import React, { FC, PropsWithChildren, memo } from 'react'

import classNames from 'classnames'

import styles from './PageLayout.module.scss'

export interface Props {
    readonly className?: string
    readonly seoTitle: string
    readonly seoDescription: string
}

export const PageLayout: FC<PropsWithChildren<Props>> = memo(
    ({ children, seoTitle, seoDescription, className }) => {
        const baseClasses = classNames(styles.base, styles.base__stretched)
        const contentClasses = classNames(styles.content, className)

        return (
            <div className={baseClasses}>
                <Head>
                    <title>{seoTitle}</title>
                    <meta name="description" content={seoDescription} />
                </Head>
                <div className={contentClasses}>{children}</div>
            </div>
        )
    },
)
