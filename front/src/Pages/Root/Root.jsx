import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar'

import './Root.css'

const Root = () => {
    return (
        <div id="root">
            <Navbar />
            <Outlet />
            {/* <Footer /> */}
        </div>
    )
}

export default Root
