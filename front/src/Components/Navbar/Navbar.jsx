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
import socket from '../../Socket/socket'
import { Badge } from '@mui/material'

const LOGGED_IN_ROUTES = [
    '/onboarding',
    '/onboarding/*',
    '/dashboard',
    '/dashboard/*',
    '/validation',
    '/verify',
]
const ONBOARDED_ROUTES = ['/dashboard', '/dashboard/*']
const NOTIFICATION_ROUTE = '/dashboard/notifications'
const MESSAGE_ROUTE = '/dashboard/messages'

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
    const onLogin = useMatch('/login')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [newNotification, setNewNotification] = useState(0)
    const [newMessage, setNewMessage] = useState(0)
    const [userImage, setUserImage] = useState(null)

    const handleSocketMessage = (notif, currentLocation) => {
        const onNotif = currentLocation.pathname.startsWith(NOTIFICATION_ROUTE)
        const onMessage = currentLocation.pathname.startsWith(MESSAGE_ROUTE)

        if (
            notif.type === 'like' ||
            notif.type === 'unlike' ||
            notif.type === 'visit' ||
            notif.type === 'interested'
        ) {
            if (!onNotif) setNewNotification((prev) => prev + 1)
        } else if (notif.type === 'message' && !onMessage) {
            setNewMessage((prev) => prev + 1)
        } else if (notif.type === 'match') {
            if (!onNotif) setNewMessage((prev) => prev + 1)
            if (!onMessage) setNewNotification((prev) => prev + 1)
        }
    }

    useEffect(() => {
        setLoggedIn(checkIfLoggedInRoute(location.pathname))
        setOnboarded(checkIfOnboardedRoute(location.pathname))
    }, [location])

    useEffect(() => {
        if (!onboarded) return

        const userInfos = sessionStorage.getItem('user_infos')
        if (userInfos) {
            const userImg = JSON.parse(userInfos).imgA
            setUserImage(userImg)
        }
    }, [onboarded])

    useEffect(() => {
        const handleSocketEvent = (notif) =>
            handleSocketMessage(notif, location)

        socket.on('notification', handleSocketEvent)
        socket.on('online-status', () => {
            console.log('online status received')
        })

        return () => {
            socket.off('notification', handleSocketEvent)
        }
    }, [socket, location])

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

    useEffect(() => {
        if (!onboarded) return
        fetch('http://localhost:8080/api/notifications/count', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data) => {
                const messageCount = data.filter(
                    (notif) =>
                        notif.type === 'message' || notif.type === 'match'
                ).length
                const notifCount = data.filter(
                    (notif) =>
                        notif.type === 'like' ||
                        notif.type === 'unlike' ||
                        notif.type === 'match' ||
                        notif.type === 'visit'
                ).length
                const onNotif = location.pathname.startsWith(NOTIFICATION_ROUTE)
                if (!onNotif) setNewNotification(notifCount)
                const onMessage = location.pathname.startsWith(MESSAGE_ROUTE)
                if (!onMessage) setNewMessage(messageCount)
            })
    }, [onboarded])

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
                    {onLogin ? (
                        <CreateAccountButton />
                    ) : (
                        <AlreadyHaveAccountBtn />
                    )}
                </div>
            )}
            {loggedIn && onboarded && (
                <div className="navbar-menu">
                    <Link
                        to="/dashboard/notifications"
                        onClick={() => setNewNotification(0)}
                    >
                        <Badge badgeContent={newNotification} color="error">
                            <Notifications
                                fontSize="large"
                                sx={{ color: 'white' }}
                            ></Notifications>
                        </Badge>
                    </Link>
                    <Link
                        to="/dashboard/messages"
                        onClick={() => setNewMessage(0)}
                    >
                        <Badge badgeContent={newMessage} color="error">
                            <Chat
                                fontSize="large"
                                sx={{ color: 'white' }}
                            ></Chat>
                        </Badge>
                    </Link>

                    <div ref={dropdownRef} className="nav-user-account">
                        {userImage ? (
                            <img
                                src={
                                    userImage.startsWith('http')
                                        ? userImage
                                        : 'http://localhost:8080/api' +
                                          userImage
                                }
                                className="avatar"
                                onClick={toggleDropdown}
                            />
                        ) : (
                            <AccountCircle
                                fontSize="large"
                                sx={{ color: 'white' }}
                                onClick={toggleDropdown}
                                className={isDropdownOpen ? 'active' : ''}
                            />
                        )}
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <Link to="dashboard/myprofile">
                                    <Portrait />
                                    View profile
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
