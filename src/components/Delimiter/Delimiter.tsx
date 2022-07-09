import React, { FC, memo } from 'react'

import classNames from 'classnames'

import styles from './Delimiter.module.scss'

export interface Props {
    readonly className?: string
    readonly vertical?: boolean
}

export const Delimiter: FC<Props> = memo(function Delimiter({ className, vertical }) {
    return <div className={classNames(className, vertical ? styles.vertical : styles.horizontal)} />
})
