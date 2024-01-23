import { USER_STATE_ACTIONS } from '../constants'
import {
    disconnectSocket,
    reconnectSocket,
    sendNotif,
} from '../Socket/socket.js'

const saveCredsToSessionMiddleware = (store) => (next) => (action) => {
    if (action.type === USER_STATE_ACTIONS.LOG_IN) {
        sessionStorage.setItem('user_infos', JSON.stringify(action.payload))
        reconnectSocket()
    }

    if (action.type === USER_STATE_ACTIONS.LOG_OUT) {
        sessionStorage.removeItem('user_infos')
        disconnectSocket()
    }

    if (action.type === USER_STATE_ACTIONS.SEND_MESSAGE) {
        sendNotif('message', action.payload)
    }

    if (action.type === USER_STATE_ACTIONS.SEND_VISIT) {
        sendNotif('visit', action.payload)
    }

    return next(action)
}

export default saveCredsToSessionMiddleware
