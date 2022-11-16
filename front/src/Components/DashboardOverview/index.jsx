import React from "react";
import ProfileCard from "../ProfileCard";
import './index.css';

const DashboardOverview = () => {
    return (
        <div>
            <div className="card_container">
                <ProfileCard />
            </div>
        </div>
    )
}

export default DashboardOverview;