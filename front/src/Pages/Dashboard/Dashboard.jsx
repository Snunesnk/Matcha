import React from 'react'
import { Outlet } from 'react-router-dom'
import { Grid } from '@mui/material'
import ChatList from '../../Components/ChatList/index'

import './Dashboard.css'

const Dashboard = () => {
    return (
        <div className="dashboard_overview">
            <Grid container>
                <Outlet />

                <Grid item xs={3} id="chat_list_container">
                    <ChatList />
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard
