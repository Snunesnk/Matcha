import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import DashboardOverview from "../../Components/DashboardOverview";
import ErrorPage from "../ErrorPage";

import './Dashboard.css';


const Dashboard = () => {
    return (
        <div id="dashboard">
            <h1 className="dashboard_title">
                MatChat
            </h1>

            <Outlet />
        </div >
    )
}

export default Dashboard;