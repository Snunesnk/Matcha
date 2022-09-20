import React, { useState } from "react";
import { Grid } from "@mui/material";
import FormInput from "../FormInput/FormInput";
import MainButton from '../MainButton/MainBtn';
import './Onboarding.css'

export default Onboarding => {
    const [onboardingClass, setOnboardingClass] = useState("");

    // Force change on the component to trigger animation
    setTimeout(() => {
        setOnboardingClass("transition");
    }, 1);

    return (
        <Grid container id='onboarding' className={onboardingClass}>
            <Grid item xs={5} id="cat_pic"></Grid>
            <Grid item xs={7} id="onboarding_content" className="centered_container">
                {/* <div id="has_account">Already have an account ?</div> */}
                <Grid container id="form" className={onboardingClass}>
                    <Grid item xs={12} className="centered_container catch_phrase center_align"><h2>Create your account to find your catmate</h2></Grid>
                    <Grid item xs={12} className="centered_container input_container"><FormInput placeholder="First Name"></FormInput></Grid>
                    <Grid item xs={12} className="centered_container input_container"><FormInput placeholder="Last Name"></FormInput></Grid>
                    <Grid item xs={12} className="centered_container input_container"><FormInput placeholder="Username"></FormInput></Grid>
                    <Grid item xs={12} className="centered_container input_container"><FormInput placeholder="Email"></FormInput></Grid>
                    <Grid item xs={12} className="centered_container input_container"><FormInput placeholder="Password"></FormInput></Grid>
                    <Grid item xs={12} className="centered_container input_container"><MainButton></MainButton></Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}