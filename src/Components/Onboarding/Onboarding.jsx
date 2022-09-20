import React, { useState } from "react";
import { Grid } from "@mui/material";
import './Onboarding.css'

export default Onboarding => {
    const [onboardingClass, setOnboardingClass] = useState("");

    // Force change on the component to trigger animation
    setTimeout(() => {
        setOnboardingClass("transition");
    }, 1);

    return (
        <Grid container id='onboarding' className={onboardingClass}>
            <Grid item xs={6} id="cat_pic"></Grid>
            <Grid item xs={6} id="onboarding_content" className="centered_container">
                {/* <div id="has_account">Already have an account ?</div> */}
                <Grid container id="form" className={onboardingClass}>
                    <Grid item xs={12} className="centered_container">Matcha</Grid>
                    <Grid item xs={12} className="centered_container">Find your catmate</Grid>
                    <Grid item xs={12} className="centered_container"><input></input></Grid>
                    <Grid item xs={12} className="centered_container"><input></input></Grid>
                    <Grid item xs={12} className="centered_container"><input></input></Grid>
                    <Grid item xs={12} className="centered_container"><input></input></Grid>
                    <Grid item xs={12} className="centered_container"><input></input></Grid>
                    <Grid item xs={12} className="centered_container"><button>Validate</button></Grid>

                </Grid>
            </Grid>
        </Grid>
    )
}