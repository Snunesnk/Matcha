import { USER_STATE_ACTIONS } from '../constants'

const checkForSessionCreds = async () => {
    let userInfos = JSON.parse(sessionStorage.getItem('user_infos'))
    const userSettings = {
        gender: '',
        preferences: { prefMale: false, prefFemale: false, prefEnby: false },
        bio: '',
        tags: [],
        pictures: [],
        birthDate: '',
    }

    if (!userInfos) {
        userInfos = {
            name: '',
            email: '',
            login: '',
        }
    }

    return {
        userInfos: userInfos,
        userSettings: userSettings,
    }
}

let initialState = await checkForSessionCreds()

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_STATE_ACTIONS.LOG_IN:
            return {
                ...state,
                userInfos: action.payload,
            }
        case USER_STATE_ACTIONS.LOG_OUT:
            sessionStorage.clear()
            return {
                userInfos: {
                    name: '',
                    email: '',
                    login: '',
                },
                userSettings: {
                    gender: '',
                    preferences: {
                        prefMale: false,
                        prefFemale: false,
                        prefEnby: false,
                    },
                    bio: '',
                    tags: [],
                    pictures: [],
                    birthDate: '',
                },
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
