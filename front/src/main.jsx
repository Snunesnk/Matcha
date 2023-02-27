import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './Router/router'
import Navbar from './Components/Navbar/Navbar'
import './index.css'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Navbar />
        <RouterProvider router={router} />
        {/* <Footer /> */}
    </React.StrictMode>
)
