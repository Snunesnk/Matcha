import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import './Navbar.css'
import { AlreadyHaveAccountBtn } from '../Button/Button'
import { useSelector } from 'react-redux'
import PetsIcon from '@mui/icons-material/Pets'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import PersonIcon from '@mui/icons-material/Person'

const GradientMessageIcon = () => (
    <>
        <svg width={0} height={0}>
            <linearGradient id="messagesColors" x1={1} y1={0} x2={1} y2={1}>
                <stop offset={0} stopColor="#4ac0fc" />
                <stop offset={0.8} stopColor="#dc21b8" />
            </linearGradient>
        </svg>
        <ChatBubbleIcon sx={{ fill: 'url(#messagesColors)' }} />
    </>
)
const GradientDashboardIcon = () => (
    <>
        <svg width={0} height={0}>
            <linearGradient id="dashboardColors" x1={1} y1={0} x2={1} y2={1}>
                <stop offset={0} stopColor="#4ac0fc" />
                <stop offset={1.2} stopColor="#dc21b8" />
            </linearGradient>
        </svg>
        <PetsIcon sx={{ fill: 'url(#dashboardColors)' }} />
    </>
)
const GradientUserIcon = () => (
    <>
        <svg width={0} height={0}>
            <linearGradient id="userColors" x1={1} y1={0} x2={1} y2={1}>
                <stop offset={0} stopColor="#4ac0fc" />
                <stop offset={1} stopColor="#dc21b8" />
            </linearGradient>
        </svg>
        <PersonIcon sx={{ fill: 'url(#userColors)' }} />
    </>
)

const MENU = {
    chat: 0,
    dashboard: 1,
    userSettings: 2,
}

const Navbar = () => {
    const userStatus = useSelector((state) => state.userState.userStatus)
    const loggedIn = userStatus.loggedIn
    const onboarded = userStatus.onboarded
    const [selectedMenu, setSelectedMenu] = useState(1)

    return (
        <Grid container id="navbar" className="fw">
            <Grid item xs={4} display="flex" justifyContent="left">
                <Link to="/">
                    <h1 className="navTitle fw">MatChat</h1>
                </Link>
            </Grid>
            <Grid item xs={4}>
                {onboarded && (
                    <div className="nav-menu-icons">
                        <Link
                            to="/dashboard/messages"
                            className={
                                'navbar-menu-icon chat-icon' +
                                (selectedMenu == MENU.chat ? ' selected' : '')
                            }
                            onClick={() => setSelectedMenu(MENU.chat)}
                        >
                            <GradientMessageIcon />
                        </Link>
                        <Link
                            to="/dashboard/"
                            className={
                                'navbar-menu-icon pet-icon' +
                                (selectedMenu == MENU.dashboard
                                    ? ' selected'
                                    : '')
                            }
                            onClick={() => setSelectedMenu(MENU.dashboard)}
                        >
                            <GradientDashboardIcon />
                        </Link>
                        <Link
                            to="/dashboard/userSettings"
                            className={
                                'navbar-menu-icon user-icon' +
                                (selectedMenu == MENU.userSettings
                                    ? ' selected'
                                    : '')
                            }
                            onClick={() => setSelectedMenu(MENU.userSettings)}
                        >
                            <GradientUserIcon />
                        </Link>
                    </div>
                )}
            </Grid>
            <Grid
                item
                xs={4}
                className="log-in-btn-container"
                justifyContent="right"
            >
                {loggedIn == false && <AlreadyHaveAccountBtn />}
            </Grid>
        </Grid>
    )
}

export default Navbar
