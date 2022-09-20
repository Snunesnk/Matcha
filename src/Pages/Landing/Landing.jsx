import React from "react";
import { Grid } from "@mui/material";
import { useStoreContext } from "../../Reducer/StoreContext";
import { PossibleState } from "../../constants";
import MainButton from "../../Components/MainButton/MainBtn";
import './Landing.css';

export default LandingPage => {

    return (
        <Grid container id='landing_container'>
            <Grid item xs={12}>
                <div className="grid_item">
                    <h1>Meet fluffy cats in you area!</h1>
                </div>
            </Grid>
            <Grid item xs={12}>
                <MainButton text="Find your new catmate"></MainButton>
            </Grid>
        </Grid>
    )
}