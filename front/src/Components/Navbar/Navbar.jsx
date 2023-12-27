import React, { useState, useRef, useEffect } from 'react'
import { Link, useMatch, useLocation } from 'react-router-dom'
import { AlreadyHaveAccountBtn, CreateAccountButton } from '../Button/Button'
import {
    AccountCircle,
    Chat,
    Pets,
    Notifications,
    Settings,
    EditNote,
    Portrait,
    Logout,
} from '@mui/icons-material'
import './Navbar.css'

const LOGGED_IN_ROUTES = [
    '/onboarding',
    '/onboarding/*',
    '/dashboard',
    '/dashboard/*',
    '/validation',
    '/verify',
]
const ONBOARDED_ROUTES = ['/dashboard', '/dashboard/*']
const checkIfLoggedInRoute = (path) => {
    if (LOGGED_IN_ROUTES.some((route) => path.startsWith(route))) {
        return true
    }
    return false
}

const checkIfOnboardedRoute = (path) => {
    if (ONBOARDED_ROUTES.some((route) => path.startsWith(route))) {
        return true
    }
    return false
}

const Navbar = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [onboarded, setOnboarded] = useState(false)
    const match = useMatch('/login')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)
    const location = useLocation()

    useEffect(() => {
        setLoggedIn(checkIfLoggedInRoute(location.pathname))
        setOnboarded(checkIfOnboardedRoute(location.pathname))
    }, [location])

    // Fonction pour basculer l'affichage du menu déroulant
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

    const handleLogout = () => {
        // Gestion de la déconnexion ici
        // Par exemple, nettoyage du local storage, mise à jour de l'état global, redirection, etc.
    }

    // Effet pour gérer le clic à l'extérieur du menu déroulant
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false) // Ferme le menu si un clic en dehors est détecté
            }
        }
        document.addEventListener('mousedown', handleOutsideClick)
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [])

    return (
        <div id="navbar">
            <Link to={loggedIn ? '/dashboard' : '/'}>
                <div className="navTitle">
                    <Pets fontSize="large"></Pets>
                    <h4 id="brand-name">MatChat</h4>
                </div>
            </Link>
            {!loggedIn && (
                <div className="center log-in-btn-container">
                    {match ? (
                        <CreateAccountButton />
                    ) : (
                        <AlreadyHaveAccountBtn />
                    )}
                </div>
            )}
            {loggedIn && onboarded && (
                <div className="navbar-menu">
                    <Link to="/dashboard/messages">
                        <Notifications
                            fontSize="large"
                            sx={{ color: 'white' }}
                        ></Notifications>
                    </Link>
                    <Link to="/dashboard/messages">
                        <Chat fontSize="large" sx={{ color: 'white' }}></Chat>
                    </Link>

                    <div ref={dropdownRef}>
                        <AccountCircle
                            fontSize="large"
                            sx={{ color: 'white' }}
                            onClick={toggleDropdown}
                        />
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <Link to="/profile">
                                    <Portrait />
                                    View profile
                                </Link>
                                <Link to="/profile">
                                    <EditNote />
                                    Edit profile
                                </Link>
                                <Link to="/dashboard/messages">
                                    <Settings />
                                    Settings
                                </Link>
                                <button>
                                    <Logout />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar
