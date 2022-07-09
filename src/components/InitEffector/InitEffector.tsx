import { useEvent } from 'effector-react/scope'
import { FC, memo, useEffect } from 'react'

import { initClient } from '../../models'

export const InitEffector: FC = memo(() => {
    const handleInit = useEvent(initClient)

    useEffect(() => {
        handleInit()

        typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null
    }, [handleInit])

    return null
})
