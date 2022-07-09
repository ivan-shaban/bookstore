import { isBrowser } from '../scope'
import { createEvent } from 'effector'

export const initClient = createEvent('initialize client')

if (isBrowser) {
    // sample({
    //     clock: updateUser,
    //     target: updateUserFx,
    // })
}
