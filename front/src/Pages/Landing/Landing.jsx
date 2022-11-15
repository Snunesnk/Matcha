import React from "react";
import { Grid } from "@mui/material";
import MainButton from "../../Components/MainButton/MainBtn";
import { Link } from "react-router-dom";
import './Landing.css';
import Navbar from "../../Components/Navbar/Navbar";


const LandingPage = () => {
    return (
        <div id="landing_page">
            <Navbar />
            <Grid container id="landing_container" direction="column" justifyContent="center">
                <Grid item >
                    <div className="grid_item">
                        <h1 id="landing_catch_phrase">Meet fluffy cats in you area</h1>
                    </div>
                </Grid>
                <Grid item >
                    <Link to="/onboarding/signup">
                        <MainButton text="Find your new catmate"></MainButton>
                    </Link>
                </Grid>
            </Grid>
        </div >
    )
}

export default LandingPage;