import { USER_STATE_ACTIONS } from '../constants'

const saveCredsToSessionMiddleware = (store) => (next) => (action) => {
    // let stateToSave = store.getState()

    switch (action.type) {
        case USER_STATE_ACTIONS.LOG_IN:
            sessionStorage.setItem('user_infos', JSON.stringify(action.payload))
            break
        default:
            break
    }

    return next(action)
}

export default saveCredsToSessionMiddleware
