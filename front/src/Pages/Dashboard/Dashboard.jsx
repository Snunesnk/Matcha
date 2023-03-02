import React from 'react'
import { Outlet, redirect, useLocation } from 'react-router-dom'
import { Grid } from '@mui/material'
import './Dashboard.css'

const Dashboard = () => {
    return (
        <div className="dashboard_overview">
            <div className="background_dashboard"></div>

            <Grid container className="dashboard_container">
                <Outlet />
            </Grid>
        </div>
    )
}

export default Dashboard
