import React, { useState, useRef, useEffect } from 'react'
import { Link, useMatch } from 'react-router-dom'
import { AlreadyHaveAccountBtn, CreateAccountButton } from '../Button/Button'
import { useSelector } from 'react-redux'
import { AccountCircle, Chat, Pets, Notifications, Settings, EditNote, Portrait, Logout } from '@mui/icons-material';
import './Navbar.css'

const Navbar = () => {
    const loggedIn = useSelector((state) => state.userState.userStatus.loggedIn)
    const match = useMatch('/login')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Fonction pour basculer l'affichage du menu déroulant
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    // Effet pour gérer le clic à l'extérieur du menu déroulant
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false); // Ferme le menu si un clic en dehors est détecté
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {document.removeEventListener('mousedown', handleOutsideClick);};
    }, []);

    return (
        <div id="navbar">
            <Link to={loggedIn ? "/dashboard" : "/"}>
                <div class="navTitle">
                    <Pets fontSize="large"></Pets>
                    <h4 id='brand-name'>MatChat</h4>
                </div>
            </Link>
            <div className="center log-in-btn-container">
                {loggedIn == false && !match && <AlreadyHaveAccountBtn />}
                {loggedIn == false && match && <CreateAccountButton />}
            </div>
            <div className="navbar-menu">
                <Link to="/dashboard/messages">
                    <Notifications fontSize="large" sx={{ color: "white" }}></Notifications>
                </Link>
                <Link to="/dashboard/messages">
                    <Chat fontSize="large" sx={{ color: "white" }}></Chat>
                </Link>

                <div ref={dropdownRef}>
                    <AccountCircle
                        fontSize="large"
                        sx={{ color: 'white' }}
                        onClick={toggleDropdown}
                    />
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <Link to="/profile"><Portrait/>View profile</Link>
                            <Link to="/profile"><EditNote/>Edit profile</Link>
                            <Link to="/dashboard/messages"><Settings/>Settings</Link>
                            <button><Logout/>Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}


export default Navbar