import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import thunk from 'redux-thunk'
import saveCredsToSessionMiddleware from './middleware'

const store = configureStore({
    reducer: {
        userState: userReducer,
    },
    preloadedState: {},
    middleware: [thunk, saveCredsToSessionMiddleware],
})

export default store
