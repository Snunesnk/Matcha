import React, { useEffect } from 'react'
import { Link, useMatch } from 'react-router-dom'
import { AlreadyHaveAccountBtn, CreateAccountButton } from '../Button/Button'
import { useSelector } from 'react-redux'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Navbar.css'

const Navbar = () => {
    const loggedIn = useSelector((state) => state.userState.userStatus.loggedIn)
    const match = useMatch('/login')

    return (
        <div id="navbar">
            <Link id="nav-title-container" to={loggedIn ? "/dashboard" : "/"}>
                <h3 className="navTitle">MatChat</h3>
            </Link>
            <Link to="/dashboard/userSettings">
                <AccountCircleIcon> test</AccountCircleIcon>
            </Link>
            <Link to="/dashboard/messages">
                <h2 className="onglet">Chat</h2>
            </Link>
            <div className="center log-in-btn-container">
                {loggedIn == false && !match && <AlreadyHaveAccountBtn />}
                {loggedIn == false && match && <CreateAccountButton />}
            </div>
        </div>
    )
}

export default Navbar