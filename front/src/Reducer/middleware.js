import { USER_STATE_ACTIONS } from '../constants'
import { initSocket } from '../Socket/socket.js'

const saveCredsToSessionMiddleware = (store) => (next) => (action) => {
    if (action.type === USER_STATE_ACTIONS.LOG_IN) {
        initSocket()
        sessionStorage.setItem('user_infos', JSON.stringify(action.payload))
    }

    return next(action)
}

export default saveCredsToSessionMiddleware
