import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardFooter from "../../Components/DashboardFooter";
import DashboardOverview from "../../Components/DashboardOverview";

import './Dashboard.css';


const Dashboard = () => {
    return (
        <div id="dashboard">
            <Routes>
                <Route path="overview" element={<DashboardOverview />}></Route>
            </Routes>
            <DashboardFooter />
        </div >
    )
}

export default Dashboard;