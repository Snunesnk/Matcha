import React, { useState } from "react";
import GridViewIcon from '@mui/icons-material/GridView';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

import "./index.css";


const DashboardFooter = () => {
    const [selectedIcon, setSelectedIcon] = useState(0);

    return (
        <div id="dashboard_footer_container">
            <div id="dashboard_footer">
                <Grid container id="footer_grid">
                    <Link to="overview"
                        className={selectedIcon !== 0 ? "centered_container" : "centered_container selected"}
                        onClick={() => setSelectedIcon(0)}
                    >
                        <GridViewIcon />
                    </Link>
                    <Link to="search"
                        className={selectedIcon !== 1 ? "centered_container" : "centered_container selected"}
                        onClick={() => setSelectedIcon(1)}
                    >
                        <SearchIcon />
                    </Link>
                    <Link to="chat"
                        className={selectedIcon !== 2 ? "centered_container" : "centered_container selected"}
                        onClick={() => setSelectedIcon(2)}
                    >
                        <ChatBubbleIcon />
                    </Link>
                    <Link to="notifications"
                        className={selectedIcon !== 3 ? "centered_container" : "centered_container selected"}
                        onClick={() => setSelectedIcon(3)}
                    >
                        <NotificationsIcon />
                    </Link>
                    <Link to="settings"
                        className={selectedIcon !== 4 ? "centered_container" : "centered_container selected"}
                        onClick={() => setSelectedIcon(4)}
                    >
                        <SettingsIcon />
                    </Link>
                </Grid>
            </div>
        </div >
    )
}

export default DashboardFooter;