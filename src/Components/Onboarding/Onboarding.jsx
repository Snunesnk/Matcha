import React, { useState } from "react";
import { Grid } from "@mui/material";
import Button from "../Button/Button";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useStoreContext } from "../../Reducer/StoreContext";
import { PossibleState } from "../../constants";
import SignupForm from "./OnboardingComponents/SignupForm";
import EmailValidation from "./OnboardingComponents/EmailValidation";
import WelcomeMessage from "./OnboardingComponents/WelcomeMessage";
import './Onboarding.css';

const onboardingStateList = {
    signUp: 0,
    emailValidation: 1,
    welcomeMessage: 2,
}

const Onboarding = ({ OnboardingClass }) => {
    const { state, dispatch } = useStoreContext();
    const [onboardingState, setOnboardingState] = useState(0);

    // Here I need to add a check in the reducer, if the user is logged in
    // then I need to redirect it to the main page
    const goToLanding = () => {
        dispatch({ type: PossibleState.landingPage });
    }

    return (
        <div id='onboarding' className={OnboardingClass}>
            <Grid container id="onboarding_grid">
                <Grid item xs={6} id="cat_pic"></Grid>
                <Grid item xs={6}>
                    <Grid container id="onboarding_content" className="centered_container">
                        <Grid item xs={12} id="onboarding_content_btn_container">
                            <a className={"onboardingBack " + OnboardingClass} onClick={goToLanding}>
                                <KeyboardArrowLeftIcon className="onboardingBackIcon"></KeyboardArrowLeftIcon>
                                <label className="onboardingBackLabel">Back</label>
                            </a>
                            <div id="already_have_account" className={OnboardingClass}>
                                <label id="alreadyHaveLabel">Already have an account?</label>
                                <Button btnClass="alreadyHaveButton" text="Log in"></Button>
                            </div>
                        </Grid>
                    </Grid >
                    {onboardingState === onboardingStateList.signUp && (
                        <SignupForm OnboardingClass={OnboardingClass} setOnboardingState={setOnboardingState}></SignupForm>
                    )}
                    {onboardingState === onboardingStateList.emailValidation && (
                        <EmailValidation setOnboardingState={setOnboardingState}></EmailValidation>
                    )}
                    {onboardingState === onboardingStateList.welcomeMessage && (
                        <WelcomeMessage></WelcomeMessage>
                    )}
                </Grid >
            </Grid >
            <div id="onboarding_progress_container">
                <div id="progress_bar_container">
                    <span>0% completed</span>
                    <div id="progress_bar" className="empty"></div>
                </div>
                <div id="next_and_prev_button">
                    <a id="onboarding_next"><KeyboardArrowDownIcon></KeyboardArrowDownIcon></a>
                    <a id="onboarding_prev"><KeyboardArrowUpIcon></KeyboardArrowUpIcon></a>
                </div>
            </div>
        </div >
    )
}

export default Onboarding;