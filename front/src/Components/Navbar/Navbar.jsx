import React, { useState, useRef, useEffect } from 'react'
import { Link, useMatch, useLocation, useNavigate } from 'react-router-dom'
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
import { useDispatch } from 'react-redux'
import { USER_STATE_ACTIONS } from '../../constants'

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
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        setLoggedIn(checkIfLoggedInRoute(location.pathname))
        setOnboarded(checkIfOnboardedRoute(location.pathname))
    }, [location])

    // Fonction pour basculer l'affichage du menu déroulant
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

    const handleLogout = () => {
        dispatch({
            type: USER_STATE_ACTIONS.LOG_OUT,
        })
        fetch('http://localhost:8080/api/user/logout', {
            method: 'GET',
            credentials: 'include',
        }).then(() => {
            navigate('/login')
        })
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
                    <Link to="/dashboard/notifications">
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
                                <Link to="dashboard/myprofile">
                                    <Portrait />View profile
                                </Link>
                                <Link to="dashboard/userSettings">
                                    <EditNote />
                                    Edit profile
                                </Link>
                                <Link to="/dashboard/discoverySettings">
                                    <Settings />
                                    Settings
                                </Link>
                                <a onClick={handleLogout}>
                                    <Logout />
                                    Logout
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar
