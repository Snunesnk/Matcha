import { USER_STATE_ACTIONS } from '../constants'
import {
    disconnectSocket,
    reconnectSocket,
    sendNotif,
} from '../Socket/socket.js'

const saveCredsToSessionMiddleware = (store) => (next) => (action) => {
    switch (action.type) {
        case USER_STATE_ACTIONS.LOG_IN:
            sessionStorage.setItem('user_infos', JSON.stringify(action.payload))
            reconnectSocket()
            break
        case USER_STATE_ACTIONS.LOG_OUT:
            sessionStorage.removeItem('user_infos')
            disconnectSocket()
            break
        case USER_STATE_ACTIONS.SEND_MESSAGE:
            sendNotif('message', action.payload)
            break
        case USER_STATE_ACTIONS.SEND_VISIT:
            sendNotif('visit', action.payload)
            break
        case USER_STATE_ACTIONS.CHECK_ONLINE_STATUS:
            sendNotif('online-check', action.payload)
            break
        case USER_STATE_ACTIONS.INTERESTED:
            sendNotif('interested', action.payload)
            break
        default:
            break
    }

    return next(action)
}

export default saveCredsToSessionMiddleware
