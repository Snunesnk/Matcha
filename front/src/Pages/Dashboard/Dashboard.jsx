import React from 'react'
import { Outlet, redirect, useLocation } from 'react-router-dom'
import './Dashboard.css'

const Dashboard = () => {
    return (
        <div className="dashboard_overview">
            <div className="background_dashboard"></div>

            <div className="dashboard_container">
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard
