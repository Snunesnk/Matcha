import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './Reducer/store'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import router from './Router/router'
import './index.css'

ReactDOM.createRoot(document.getElementById('app')).render(
    // <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
    // </React.StrictMode>
)
