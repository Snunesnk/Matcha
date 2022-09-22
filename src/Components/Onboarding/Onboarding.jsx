import React, { useState } from "react";
import { Grid } from "@mui/material";
import FormInput from "../FormInput/FormInput";
import Button from "../Button/Button";
import MainButton from '../MainButton/MainBtn';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useStoreContext } from "../../Reducer/StoreContext";
import { PossibleState } from "../../constants";
import './Onboarding.css';

const Onboarding = ({ onBoardingClass }) => {
    const { state, dispatch } = useStoreContext();

    // Here I need to add a check in the reducer, if the user is logged in
    // then I need to redirect it to the main page
    const goToLanding = () => {
        dispatch({ type: PossibleState.landingPage });
    }

    return (
        <div id='onboarding' className={onBoardingClass}>
            <Grid container id="onboarding_grid">
                <Grid item xs={6} id="cat_pic"></Grid>
                <Grid item xs={6}>
                    <Grid container id="onboarding_content" className="centered_container">
                        <Grid item xs={12} id="onboarding_content_btn_container">
                            <div id="onboarding_back">
                                <a className={"onboardingBack " + onBoardingClass} onClick={goToLanding}><KeyboardArrowLeftIcon></KeyboardArrowLeftIcon>Back</a>
                            </div>
                            <div id="already_have_account" className={onBoardingClass}>
                                <label id="alreadyHaveLabel">Already have an account?</label>
                                <Button btnClass={"alreadyHaveButton"} text="Log in"></Button>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container id="form" className={onBoardingClass}>
                                <Grid item xs={12} className="centered_container catch_phrase center_align"><h2>Create your account to find your catmate</h2></Grid>
                                <Grid item xs={12} className="centered_container input_container"><FormInput placeholder="First Name"></FormInput></Grid>
                                <Grid item xs={12} className="centered_container input_container"><FormInput placeholder="Last Name"></FormInput></Grid>
                                <Grid item xs={12} className="centered_container input_container"><FormInput placeholder="Username"></FormInput></Grid>
                                <Grid item xs={12} className="centered_container input_container"><FormInput placeholder="Email"></FormInput></Grid>
                                <Grid item xs={12} className="centered_container input_container"><FormInput placeholder="Password"></FormInput></Grid>
                                <Grid item xs={12} className="centered_container button_container"><MainButton text="Create my account" shadowClass="sub"></MainButton></Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </div>
    )
}

export default Onboarding;