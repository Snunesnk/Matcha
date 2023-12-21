import React, { useEffect } from 'react'
import { Link, useMatch } from 'react-router-dom'
import { AlreadyHaveAccountBtn, CreateAccountButton } from '../Button/Button'
import './Navbar.css'

const Navbar = () => {
    const match = useMatch('/login')

    return (
        <div id="navbar">
            <Link id="nav-title-container" to={'/'}>
                <h3 className="navTitle">MatChat</h3>
            </Link>
            <Link to="/dashboard/userSettings">
                <h2 className="onglet">Profil</h2>
            </Link>
            <Link to="/dashboard/messages">
                <h2 className="onglet">Chat</h2>
            </Link>
            <div className="center log-in-btn-container">
                {match ? <CreateAccountButton /> : <AlreadyHaveAccountBtn />}
            </div>
        </div>
    )
}

export default Navbar
