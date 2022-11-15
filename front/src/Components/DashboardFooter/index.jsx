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
                    <Grid item
                        className={selectedIcon !== 0 ? "centered_container" : "centered_container selected"}
                        onClick={() => setSelectedIcon(0)}
                    >
                        <Link to="overview">
                            <GridViewIcon />
                        </Link>
                    </Grid>
                    <Grid item
                        className={selectedIcon !== 1 ? "centered_container" : "centered_container selected"}
                        onClick={() => setSelectedIcon(1)}
                    >
                        <SearchIcon />
                    </Grid>
                    <Grid item
                        className={selectedIcon !== 2 ? "centered_container" : "centered_container selected"}
                        onClick={() => setSelectedIcon(2)}
                    >
                        <ChatBubbleIcon />
                    </Grid>
                    <Grid item
                        className={selectedIcon !== 3 ? "centered_container" : "centered_container selected"}
                        onClick={() => setSelectedIcon(3)}
                    >
                        <NotificationsIcon />
                    </Grid>
                    <Grid item
                        className={selectedIcon !== 4 ? "centered_container" : "centered_container selected"}
                        onClick={() => setSelectedIcon(4)}
                    >
                        <SettingsIcon />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default DashboardFooter;