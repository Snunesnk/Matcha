import React from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import './Navbar.css'
import { AlreadyHaveAccountBtn } from '../Button/Button'

const Navbar = () => {
    return (
        <Grid container id="navbar" className="fw">
            <Grid item xs={4} className="center"></Grid>
            <Grid item xs={4} className="center">
                <Link to="/">
                    <h1 className="navTitle fw">MatChat</h1>
                </Link>
            </Grid>
            <Grid item xs={4} className="center log-in-btn-container">
                <AlreadyHaveAccountBtn />
            </Grid>
        </Grid>
    )
}

export default Navbar
