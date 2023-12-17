import React from 'react'
import { Link } from 'react-router-dom'
import { AlreadyHaveAccountBtn, LogoutBtn } from '../Button/Button'
import { useSelector } from 'react-redux'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Navbar.css'

const Navbar = () => {
    const loggedIn = useSelector((state) => state.userState.userStatus.loggedIn)

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
                {loggedIn ?
                <LogoutBtn /> : 
                <AlreadyHaveAccountBtn />}
            </div>
        </div>
    )
}

export default Navbar