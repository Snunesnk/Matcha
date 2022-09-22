import React, { useState } from "react";
import { Grid } from "@mui/material";
import FormInput from "../FormInput/FormInput";
import Button from "../Button/Button";
import MainButton from '../MainButton/MainBtn';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useStoreContext } from "../../Reducer/StoreContext";
import { PossibleState } from "../../constants";
import './Onboarding.css';

const validationErrors = {
    fieldEmpty: "This field is required",

}

const Onboarding = ({ onBoardingClass }) => {
    const { state, dispatch } = useStoreContext();

    // Initialise form data
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Store potential errors
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // Here I need to add a check in the reducer, if the user is logged in
    // then I need to redirect it to the main page
    const goToLanding = () => {
        dispatch({ type: PossibleState.landingPage });
    }

    const checkAndSendAccountInfos = () => {
        // First name => Must not be empty
        if (firstName === "")
            setFirstNameError(validationErrors.fieldEmpty);
        else
            setFirstNameError("");
        // Last name => Must not be empty
        if (lastName === "")
            setLastNameError(validationErrors.fieldEmpty);
        else
            setLastNameError("");
        // Username => Must not be empty
        if (username === "")
            setUsernameError(validationErrors.fieldEmpty);
        else
            setUsernameError("");
    }

    return (
        <div id='onboarding' className={onBoardingClass}>
            <Grid container id="onboarding_grid">
                <Grid item xs={6} id="cat_pic"></Grid>
                <Grid item xs={6}>
                    <Grid container id="onboarding_content" className="centered_container">
                        <Grid item xs={12} id="onboarding_content_btn_container">
                            <a className={"onboardingBack " + onBoardingClass} onClick={goToLanding}>
                                <KeyboardArrowLeftIcon className="onboardingBackIcon"></KeyboardArrowLeftIcon>
                                <label className="onboardingBackLabel">Back</label>
                            </a>
                            <div id="already_have_account" className={onBoardingClass}>
                                <label id="alreadyHaveLabel">Already have an account?</label>
                                <Button btnClass="alreadyHaveButton" text="Log in"></Button>
                            </div>
                        </Grid>
                        <Grid container item id="onboarding_sign_up" className={onBoardingClass}>
                            <Grid item xs={12} className="centered_container onboarding_title center_align"><h1>MatChat</h1></Grid>
                            <Grid item xs={12} className="centered_container catch_phrase center_align"><h2>Create your account to find your catmate</h2></Grid>
                            <Grid item xs={12} className="centered_container input_container">
                                <FormInput placeholder="First Name" value={firstName} updateValue={setFirstName}></FormInput>
                            </Grid>
                            {firstNameError !== "" && (<Grid item xs={12} className="centered_container"><label className="errorLabel">{firstNameError}</label></Grid>)}
                            <Grid item xs={12} className="centered_container input_container">
                                <FormInput placeholder="Last Name" value={lastName} updateValue={setLastName}></FormInput>
                            </Grid>
                            {lastNameError !== "" && (<Grid item xs={12} className="centered_container"><label className="errorLabel">{lastNameError}</label></Grid>)}
                            <Grid item xs={12} className="centered_container input_container">
                                <FormInput placeholder="Username" value={username} updateValue={setUsername}></FormInput>
                            </Grid>
                            {usernameError !== "" && (<Grid item xs={12} className="centered_container"><label className="errorLabel">{usernameError}</label></Grid>)}
                            <Grid item xs={12} className="centered_container input_container">
                                <FormInput placeholder="Email" type="email" value={email} updateValue={setEmail}></FormInput>
                            </Grid>
                            {emailError !== "" && (<Grid item xs={12} className="centered_container"><label className="errorLabel">{emailError}</label></Grid>)}
                            <Grid item xs={12} className="centered_container input_container">
                                <FormInput placeholder="Password" type="password" value={password} updateValue={setPassword}></FormInput>
                            </Grid>
                            {passwordError !== "" && (<Grid item xs={12} className="centered_container"><label className="errorLabel">{passwordError}</label></Grid>)}
                            <Grid item xs={12} className="centered_container button_container">
                                <MainButton text="Create my account" shadowClass="sub" click={checkAndSendAccountInfos}></MainButton>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </div>
    )
}

export default Onboarding;