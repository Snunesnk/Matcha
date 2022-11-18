import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardFooter from "../../Components/DashboardFooter";
import DashboardOverview from "../../Components/DashboardOverview";
import Title from "../../Components/Title/Title";

import './Dashboard.css';


const Dashboard = () => {
    return (
        <div id="dashboard">
            <h1 className="dashboard_title">
                MatChat
            </h1>
            <Routes>
                <Route path="overview" element={<DashboardOverview />}></Route>
            </Routes>
            {/* <DashboardFooter /> */}
        </div >
    )
}

export default Dashboard;