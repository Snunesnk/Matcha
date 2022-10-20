import React, { useState } from "react";
import { Grid } from "@mui/material";
import Button from "../../Components/Button/Button";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useStoreContext } from "../../Reducer/StoreContext";
import { PossibleState } from "../../constants";
import SignupForm from "../../Components/OnboardingFormComponents/SignupForm";
import EmailValidation from "../../Components/OnboardingFormComponents/EmailValidation";
import WelcomeMessage from "../../Components/OnboardingFormComponents/WelcomeMessage";
import GenderSelection from "../../Components/OnboardingFormComponents/GenderSelection";
import SexualOrientation from "../../Components/OnboardingFormComponents/SexualOrientation";
import DescriptionCreation from "../../Components/OnboardingFormComponents/DescriptionCreation";
import InterestsTags from "../../Components/OnboardingFormComponents/InterestsTags";
import PicturesUploading from "../../Components/OnboardingFormComponents/PicturesUploading";
import AllSetMessage from "../../Components/OnboardingFormComponents/AllSetMessage";
import './Onboarding.css';

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

const progressBarStatus = [
    // Does not appear in signup and email validation
    {
        percent: "",
        class: ""
    },
    {
        percent: "",
        class: ""
    },
    // Welcome message and gender selection are 0%
    {
        percent: "0",
        class: "progress_zero"
    },
    {
        percent: "0",
        class: "progress_zero"
    },
    {
        percent: "20",
        class: "progress_twenty"
    },
    {
        percent: "40",
        class: "progress_forty"
    },
    {
        percent: "60",
        class: "progress_sixty"
    },
    {
        percent: "80",
        class: "progress_eighty"
    },
    {
        percent: "100",
        class: "progress_hundred"
    },
]

const Onboarding = ({ OnboardingClass }) => {
    const { state, dispatch } = useStoreContext();
    const [onboardingState, setOnboardingState] = useState(0);

    // Here I need to add a check in the reducer, if the user is logged in
    // then I need to redirect it to the main page
    const goToLanding = () => {
        // Reset onboarding state first
        // If an email was sent, but not validated, then stay on this page
        if (onboardingState === onboardingStateList.emailValidation)
            setOnboardingState(onboardingStateList.emailValidation);
        // Else if email was validated, set it back to the first step of the form
        else if (onboardingState >= onboardingStateList.WelcomeMessage)
            setOnboardingState(onboardingStateList.allSetMessage);

        dispatch({ type: PossibleState.landingPage });
    }

    const goToNextState = () => {
        if (onboardingState > onboardingStateList.welcomeMessage)
            setOnboardingState(onboardingState - 1);
    }

    const goToPreviousState = () => {
        if (onboardingState < onboardingStateList.allSetMessage)
            setOnboardingState(onboardingState + 1);
    }

    return (
        <div id='onboarding' className={OnboardingClass}>
            <Grid container id="onboarding_grid">
                <Grid item xs={0} md={6} id="cat_pic"></Grid>
                <Grid item xs={12} md={6}>
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
                        <SignupForm OnboardingClass={OnboardingClass} setOnboardingState={setOnboardingState} onboardingStateList={onboardingStateList}></SignupForm>
                    )}
                    {onboardingState === onboardingStateList.emailValidation && (
                        <EmailValidation setOnboardingState={setOnboardingState} onboardingStateList={onboardingStateList}></EmailValidation>
                    )}
                    {onboardingState === onboardingStateList.welcomeMessage && (
                        <WelcomeMessage setOnboardingState={setOnboardingState} onboardingStateList={onboardingStateList}></WelcomeMessage>
                    )}
                    {onboardingState === onboardingStateList.genderSelection && (
                        <GenderSelection setOnboardingState={setOnboardingState} onboardingStateList={onboardingStateList}></GenderSelection>
                    )}
                    {onboardingState === onboardingStateList.sexualOrientation && (
                        <SexualOrientation setOnboardingState={setOnboardingState} onboardingStateList={onboardingStateList}></SexualOrientation>
                    )}
                    {onboardingState === onboardingStateList.descriptionCreation && (
                        <DescriptionCreation setOnboardingState={setOnboardingState} onboardingStateList={onboardingStateList}></DescriptionCreation>
                    )}
                    {onboardingState === onboardingStateList.interestsTags && (
                        <InterestsTags setOnboardingState={setOnboardingState} onboardingStateList={onboardingStateList}></InterestsTags>
                    )}
                    {onboardingState === onboardingStateList.picturesUploading && (
                        <PicturesUploading setOnboardingState={setOnboardingState} onboardingStateList={onboardingStateList}></PicturesUploading>
                    )}
                    {onboardingState === onboardingStateList.allSetMessage && (
                        <AllSetMessage setOnboardingState={setOnboardingState} onboardingStateList={onboardingStateList}></AllSetMessage>
                    )}
                </Grid >
            </Grid >
            {onboardingState !== onboardingStateList.emailValidation && onboardingState !== onboardingStateList.signUp && (
                <div id="onboarding_progress_container">
                    <div id="progress_bar_container">
                        <span>{progressBarStatus[onboardingState].percent}% completed</span>
                        <div id="progress_bar" className={progressBarStatus[onboardingState].class}></div>
                    </div>
                    <div id="next_and_prev_button">
                        <a id="onboarding_next" onClick={goToPreviousState}><KeyboardArrowDownIcon></KeyboardArrowDownIcon></a>
                        <a id="onboarding_prev" onClick={goToNextState}><KeyboardArrowUpIcon></KeyboardArrowUpIcon></a>
                    </div>
                </div>

            )}
        </div >
    )
}

export default Onboarding;