import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { AlreadyHaveAccountBtn } from '../Button/Button'
import { useSelector } from 'react-redux'
import PetsIcon from '@mui/icons-material/Pets'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import PersonIcon from '@mui/icons-material/Person'

const GradientMessageIcon = ({ selected }) => (
    <>
        <svg width={0} height={0}>
            <linearGradient id="messagesColors" x1={1} y1={0} x2={1} y2={1}>
                <stop offset={0} stopColor="#4ac0fc" />
                <stop offset={0.8} stopColor="#dc21b8" />
            </linearGradient>
        </svg>
        {selected && <ChatBubbleIcon sx={{ fill: 'white' }} />}
        {!selected && <ChatBubbleIcon sx={{ fill: 'url(#messagesColors)' }} />}
    </>
)
const GradientDashboardIcon = ({ selected }) => (
    <>
        <svg width={0} height={0}>
            <linearGradient id="dashboardColors" x1={1} y1={0} x2={1} y2={1}>
                <stop offset={0} stopColor="#4ac0fc" />
                <stop offset={1.2} stopColor="#dc21b8" />
            </linearGradient>
        </svg>
        {selected && <PetsIcon sx={{ fill: 'white' }} />}
        {!selected && <PetsIcon sx={{ fill: 'url(#dashboardColors)' }} />}
    </>
)
const GradientUserIcon = ({ selected }) => (
    <>
        <svg width={0} height={0}>
            <linearGradient id="userColors" x1={1} y1={0} x2={1} y2={1}>
                <stop offset={0} stopColor="#4ac0fc" />
                <stop offset={1} stopColor="#dc21b8" />
            </linearGradient>
        </svg>
        {selected && <PersonIcon sx={{ fill: 'white' }} />}
        {!selected && <PersonIcon sx={{ fill: 'url(#userColors)' }} />}
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
        <div id="navbar" className="fw">
            <div className="nav-title-container">
                <Link to="/">
                    <h1 className="navTitle fw">MatChat</h1>
                </Link>
            </div>
            {onboarded && (
                <div className="nav-menu-icons-container">
                    <div className="nav-menu-icons">
                        <Link
                            to="/dashboard/messages"
                            className={
                                'navbar-menu-icon chat-icon' +
                                (selectedMenu == MENU.chat ? ' selected' : '')
                            }
                            onClick={() => setSelectedMenu(MENU.chat)}
                        >
                            <GradientMessageIcon
                                selected={selectedMenu == MENU.chat}
                            />
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
                            <GradientDashboardIcon
                                selected={selectedMenu == MENU.dashboard}
                            />
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
                            <GradientUserIcon
                                selected={selectedMenu == MENU.userSettings}
                            />
                        </Link>
                    </div>
                </div>
            )}
            <div className="log-in-btn-container">
                {loggedIn == false && <AlreadyHaveAccountBtn />}
            </div>
        </div>
    )
}

export default Navbar
