import { Grid } from "@mui/material";
import React from "react";
import AdvancedSearch from "../AdvancedSearch";
import ProfileCard from "../ProfileCard";
import ProfileMatching from "../ProfileMatching";
import './index.css';

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
        // <div className="dashboard_overview">
        //     <Grid item xs={4}>
        //         <div>Age</div>
        //     </Grid>
        //     <Grid item xs={8} container>
        //         <div className="cards_header">
        //             <div className="overview_top_phrase">
        //                 Profiles that you might like
        //             </div>
        //             <div className="overview_sort">
        //                 Sort by
        //             </div>
        //         </div>
        //         <div className="overview_grid_container">
        //             <Grid container  >
        //                 {results}
        //             </Grid>
        //         </div>
        //     </Grid>
        // </div >

        <div className="dashboard_overview">
            <Grid container>
                <Grid item xs={3} id="advanced_search_container">
                    <AdvancedSearch />
                </Grid>
                <Grid item xs={6}>
                    <ProfileMatching />
                </Grid>
                <Grid item xs={3}>
                    Messages
                </Grid>
            </Grid>

        </div>
    )
}

export default DashboardOverview;