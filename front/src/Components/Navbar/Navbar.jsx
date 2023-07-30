import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AlreadyHaveAccountBtn } from '../Button/Button'
import { useSelector } from 'react-redux'
import './Navbar.css'

const Navbar = () => {
    const loggedIn = useSelector((state) => state.userState.userStatus.loggedIn)

    return (
        <div id="navbar">
            <Link id="nav-title-container" to="/">
                <h3 className="navTitle">MatChat</h3>
            </Link>
            <div className="center log-in-btn-container">
                {loggedIn == false && <AlreadyHaveAccountBtn />}
            </div>
        </div>
    )
}

export default Navbar
