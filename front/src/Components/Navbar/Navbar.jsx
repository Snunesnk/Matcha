import React, { useEffect } from 'react'
import { Link, useMatch } from 'react-router-dom'
import { AlreadyHaveAccountBtn, CreateAccountButton } from '../Button/Button'
import { useSelector } from 'react-redux'
import './Navbar.css'

const Navbar = () => {
    const loggedIn = useSelector((state) => state.userState.userStatus.loggedIn)
    const match = useMatch('/login')

    return (
        <div id="navbar">
            <Link id="nav-title-container" to="/">
                <h3 className="navTitle">MatChat</h3>
            </Link>
            <div className="center log-in-btn-container">
                {loggedIn == false && !match && <AlreadyHaveAccountBtn />}
                {loggedIn == false && match && <CreateAccountButton />}
            </div>
        </div>
    )
}

export default Navbar
