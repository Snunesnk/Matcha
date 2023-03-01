import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import './Navbar.css'
import { AlreadyHaveAccountBtn } from '../Button/Button'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const loggedIn = useSelector((state) => state.userState.userStatus.loggedIn)

    return (
        <Grid container id="navbar" className="fw">
            <Grid item xs={4} className="center"></Grid>
            <Grid item xs={4} className="center">
                <Link to="/">
                    <h1 className="navTitle fw">MatChat</h1>
                </Link>
            </Grid>
            <Grid item xs={4} className="center log-in-btn-container">
                {loggedIn == false && <AlreadyHaveAccountBtn />}
            </Grid>
        </Grid>
    )
}

export default Navbar
