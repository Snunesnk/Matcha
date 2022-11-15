import React, { useState } from "react";
import { Link, Outlet, useNavigate, Route, Routes } from "react-router-dom";
import { Grid } from "@mui/material";
import Button from "../../Components/Button/Button";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import './Onboarding.css';
import ProgressBar from "../../Components/ProgressBar";

const onboardingStateList = {
    signUp: 0,
    emailValidation: 1,
    welcomeMessage: 2,
    genderSelection: 3,
    sexualOrientation: 4,
    descriptionCreation: 5,
    interestsTags: 6,
    picturesUploading: 7,
    allSetMessage: 8
}

const Onboarding = () => {
    // const { state, dispatch } = useStoreContext();
    const [onboardingState, setOnboardingState] = useState(0);
    const navigate = useNavigate();

    // // Here I need to add a check in the reducer, if the user is logged in
    // // then I need to redirect it to the main page
    // const goToLanding = () => {
    //     // Reset onboarding state first
    //     // If an email was sent, but not validated, then stay on this page
    //     if (onboardingState === onboardingStateList.emailValidation)
    //         setOnboardingState(onboardingStateList.emailValidation);
    //     // Else if email was validated, set it back to the first step of the form
    //     else if (onboardingState >= onboardingStateList.WelcomeMessage)
    //         setOnboardingState(onboardingStateList.allSetMessage);

    //     // dispatch({ type: PossibleState.landingPage });
    // }

    return (
        <div id='onboarding'>
            <Grid container id="onboarding_grid">
                <Grid item xs={0} md={6} id="cat_pic"></Grid>
                <Grid item xs={12} md={6}>
                    <Grid container id="onboarding_content" className="centered_container">
                        <Grid item xs={12} id="onboarding_content_btn_container">
                            <Link to="/">
                                <a className={"onboardingBack "}>
                                    <KeyboardArrowLeftIcon className="onboardingBackIcon"></KeyboardArrowLeftIcon>
                                    <label className="onboardingBackLabel">Quit</label>
                                </a>
                            </Link>
                            <div id="already_have_account" >
                                <label id="alreadyHaveLabel">Already have an account?</label>
                                <Button btnClass="alreadyHaveButton" text="Log in"></Button>
                            </div>
                        </Grid>
                    </Grid >

                    {/* Onboarding children */}
                    <Outlet />

                </Grid >
            </Grid >

            <Routes>
                <Route path="welcome" element={<ProgressBar percentage="0" prev="" next="gender" />} />
                <Route path="gender" element={<ProgressBar percentage="0" prev="welcome" next="preferences" />} />
                <Route path="preferences" element={<ProgressBar percentage="20" prev="gender" next="bio" />} />
                <Route path="bio" element={<ProgressBar percentage="40" prev="preferences" next="interests" />} />
                <Route path="interests" element={<ProgressBar percentage="60" prev="bio" next="pictures" />} />
                <Route path="pictures" element={<ProgressBar percentage="80" prev="interests" next="done" />} />
                <Route path="done" element={<ProgressBar percentage="100" prev="pictures" next="" />} />
            </Routes>
        </div >
    )
}

export default Onboarding;