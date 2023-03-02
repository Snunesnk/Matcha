import { USER_STATE_ACTIONS } from '../constants'

const checkForSessionCreds = () => {
    let userInfos = JSON.parse(sessionStorage.getItem('user_infos'))
    const userSettings = {
        gender: '',
        preferences: { prefMale: true, prefFemale: true, prefEnby: false },
        bio: '',
        tags: [],
        pictures: {},
        birthDate: '',
    }
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
        userSettings: userSettings,
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

        case USER_STATE_ACTIONS.UPDATE_GENDER:
            return {
                ...state,
                userSettings: { ...state.userSettings, gender: action.payload },
            }

        case USER_STATE_ACTIONS.UPADTE_PREFERENCES:
            return {
                ...state,
                userSettings: {
                    ...state.userSettings,
                    preferences: action.payload,
                },
            }

        case USER_STATE_ACTIONS.UPDATE_BIO:
            return {
                ...state,
                userSettings: {
                    ...state.userSettings,
                    bio: action.payload,
                },
            }

        case USER_STATE_ACTIONS.UPDATE_TAGS:
            return {
                ...state,
                userSettings: {
                    ...state.userSettings,
                    tags: action.payload,
                },
            }

        case USER_STATE_ACTIONS.UPDATE_PICTURES:
            return {
                ...state,
                userSettings: {
                    ...state.userSettings,
                    pictures: { ...action.payload },
                },
            }

        default:
            return state
    }
}

export default userReducer
