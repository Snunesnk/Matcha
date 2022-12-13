import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardOverview from "../../Components/DashboardOverview";
import ErrorPage from "../ErrorPage";

import './Dashboard.css';


const Dashboard = () => {
    return (
        <div id="dashboard">
            <h1 className="dashboard_title">
                MatChat
            </h1>
            <Routes>
                <Route path="overview" element={<DashboardOverview />} errorElement={<ErrorPage />}></Route>
            </Routes>
            {/* <DashboardFooter /> */}
        </div >
    )
}

export default Dashboard;