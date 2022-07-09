import Link from 'next/link'
import React, { FC, MouseEvent, PropsWithChildren, memo } from 'react'

import classNames from 'classnames'

import styles from './Text.module.scss'

export enum TextVariant {
    Regular,
    RegularBold,
    Header,
    Subtitle,
    Title,
    Label,
    Description,
}

export enum TextColors {
    Primary,
    Secondary,
    White,
    Grey,
    MidGrey,
    Success,
    Danger,
}

export interface Props {
    readonly variant?: TextVariant
    readonly color?: TextColors
    readonly href?: string
    readonly className?: string
    readonly component?: 'a' | 'span'
    readonly onClick?: (event: MouseEvent<HTMLParagraphElement>) => void
}

export const Text: FC<PropsWithChildren<Props>> = memo(function Text({
    children,
    className,
    href,
    component,
    onClick,
    variant = TextVariant.Regular,
    color = TextColors.Primary,
}) {
    const baseClasses = classNames(styles.base, className, {
        [styles.base__regular]: variant === TextVariant.Regular,
        [styles.base__regularBold]: variant === TextVariant.RegularBold,
        [styles.base__header]: variant === TextVariant.Header,
        [styles.base__title]: variant === TextVariant.Title,
        [styles.base__subtitle]: variant === TextVariant.Subtitle,
        [styles.base__label]: variant === TextVariant.Label,
        [styles.base__description]: variant === TextVariant.Description,
        [styles.base__colorPrimary]: color === TextColors.Primary,
        [styles.base__colorSecondary]: color === TextColors.Secondary,
        [styles.base__colorWhite]: color === TextColors.White,
        [styles.base__colorGrey]: color === TextColors.Grey,
        [styles.base__colorMidGrey]: color === TextColors.MidGrey,
        [styles.base__colorSuccess]: color === TextColors.Success,
        [styles.base__colorDanger]: color === TextColors.Danger,
    })

    switch (component) {
        case 'a': {
            return (
                <Link href={href!} onClick={onClick}>
                    <a className={baseClasses}>{children}</a>
                </Link>
            )
        }
        case 'span': {
            return (
                <span className={baseClasses} onClick={onClick}>
                    {children}
                </span>
            )
        }
        default: {
            return (
                <p className={baseClasses} onClick={onClick}>
                    {children}
                </p>
            )
        }
    }
})
