import { Grid } from "@mui/material";
import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import AdvancedSearch from "../AdvancedSearch";
import ChatList from "../ChatList";
import ProfileCard from "../ProfileCard";
import ProfileMatching from "../ProfileMatching";
import './index.css';

export const OverviewComponent = () => (
    <Grid item container xs={9}>
        <Grid item xs={4}>
            <AdvancedSearch />
        </Grid>
        <Grid item xs={8}>
            <ProfileMatching />
        </Grid>
    </Grid>);

const DashboardOverview = () => {
    let results = [];

    while (results.length < 25) {
        results.push((
            <Grid item className="card_container">
                <ProfileCard />
            </Grid>
        ));
    }

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

export default DashboardOverview;