import { USER_STATE_ACTIONS } from '../constants'

const checkForSessionCreds = () => {
    let userInfos = JSON.parse(sessionStorage.getItem('user_infos'))
    const verified = sessionStorage.getItem('verified') ? true : false
    const onboarded = sessionStorage.getItem('onboarded') ? true : false
    let loggedIn = true

    if (!userInfos) {
        userInfos = {
            name: '',
            email: '',
            login: '',
        }
        loggedIn = false
    }

    return {
        userStatus: {
            loggedIn: loggedIn,
            verified: verified,
            onboarded: onboarded,
        },
        userInfos: userInfos,
    }
}

let initialState = checkForSessionCreds()

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_STATE_ACTIONS.LOG_IN:
            return {
                ...state,
                userStatus: { ...state.userStatus, loggedIn: true },
                userInfos: action.payload,
            }
        case USER_STATE_ACTIONS.LOG_OUT:
            return {
                ...state,
                userStatus: { ...state.userStatus, loggedIn: false },
            }
        case USER_STATE_ACTIONS.VERIFY:
            return {
                ...state,
                userStatus: { ...state.userStatus, verified: true },
            }
        case USER_STATE_ACTIONS.UNVERIFY:
            return {
                ...state,
                userStatus: { ...state.userStatus, verified: false },
            }
        default:
            return state
    }
}

export default userReducer
