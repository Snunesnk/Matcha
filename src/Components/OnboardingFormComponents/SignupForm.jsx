import { useState } from 'react';
import { Grid } from "@mui/material";
import MainButton from '../MainButton/MainBtn';
import FormInput from "../FormInput/FormInput";
import { validationErrors } from '../../constants';
import { useStoreContext } from "../../Reducer/StoreContext";
import "./OnboardingForm.css"

const SignupForm = ({ OnboardingClass, setOnboardingState, onboardingStateList }) => {
    // Store potential errors
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const { state, dispatch } = useStoreContext();

    function isEmail(email) {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    } function hasUppercase(passwd) {
        return passwd.toLowerCase() !== passwd;
    }

    function hasLowercase(passwd) {
        return passwd.toUpperCase() !== passwd;
    }

    function hasDigit(passwd) {
        return String(passwd)
            .match(
                /\d/
            );
    }

    const checkAndSendAccountInfos = () => {
        let error = false;

        // First name => Must not be empty
        if (firstName === "") {
            setFirstNameError(validationErrors.fieldEmpty);
            error = true;
        }
        else
            setFirstNameError("");
        // Last name => Must not be empty
        if (lastName === "") {
            setLastNameError(validationErrors.fieldEmpty);
            error = true;
        }
        else
            setLastNameError("");
        // Username => Must not be empty
        if (username === "") {
            setUsernameError(validationErrors.fieldEmpty);
            error = true;
        }
        else
            setUsernameError("");

        // Email => must not be empty
        if (email === "") {
            setEmailError(validationErrors.fieldEmpty);
            error = true;
        }
        // Email => must also follow email's pattern
        else if (!isEmail(email)) {
            setEmailError(validationErrors.invalidEmail);
            error = true;
        }
        else
            setEmailError("");

        // Password => must not be empty
        if (password === "") {
            setPasswordError(validationErrors.fieldEmpty);
            error = true;
        }
        // Password => must be at least 12 character long
        if (password.length < 12) {
            setPasswordError(validationErrors.invalidPasswordLength);
            error = true;
        }
        // Password => must have at least 1 uppercase char
        else if (!hasLowercase(password)) {
            setPasswordError(validationErrors.missingPasswordLowercase);
            error = true;
        }
        // Password => must have at least 1 lowercase char
        else if (!hasUppercase(password)) {
            setPasswordError(validationErrors.missingPasswordUppercase);
            error = true;
        }
        // Password => must have at least 1 digit
        else if (!hasDigit(password)) {
            setPasswordError(validationErrors.missingPasswordDigit);
            error = true;
        }
        else
            setPasswordError("");

        if (!error) {
            setOnboardingState(onboardingStateList.emailValidation);
            dispatch({
                type: "user:updateUserInfos",
                payload: {
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    email: email,
                    password: password
                }
            });
        }
        //// DEBUG !!! => TO REMOVE /////
        else {
            setOnboardingState(onboardingStateList.emailValidation);
        }
    }


    return (
        <Grid container item id="onboarding_sign_up" className={OnboardingClass}>
            <Grid item xs={12} className="centered_container onboarding_title center_align"><h1>MatChat</h1></Grid>
            <Grid item xs={12} className="centered_container catch_phrase center_align"><h3>Create your account to find your catmate</h3></Grid>
            <Grid container item xs={12} className="centered_container input_container">
                <Grid item xs={12} className="centered_container"><FormInput placeholder="First Name" value={firstName} updateValue={e => setFirstName(e)}></FormInput></Grid>
                {firstNameError !== "" && (<Grid item xs={12} className="centered_container"><label className="errorLabel">{firstNameError}</label></Grid>)}
            </Grid>
            <Grid container item xs={12} className="centered_container input_container">
                <Grid item xs={12} className="centered_container"><FormInput placeholder="Last Name" value={lastName} updateValue={e => setLastName(e)}></FormInput></Grid>
                {lastNameError !== "" && (<Grid item xs={12} className="centered_container"><label className="errorLabel">{lastNameError}</label></Grid>)}
            </Grid>
            <Grid container item xs={12} className="centered_container input_container">
                <Grid item xs={12} className="centered_container"><FormInput placeholder="Username" value={username} updateValue={e => setUsername(e)}></FormInput></Grid>
                {usernameError !== "" && (<Grid item xs={12} className="centered_container"><label className="errorLabel">{usernameError}</label></Grid>)}
            </Grid>
            <Grid container item xs={12} className="centered_container input_container">
                <Grid item xs={12} className="centered_container"><FormInput placeholder="Email" type="email" value={email} updateValue={e => setEmail(e)}></FormInput></Grid>
                {emailError !== "" && (<Grid item xs={12} className="centered_container"><label className="errorLabel">{emailError}</label></Grid>)}
            </Grid>
            <Grid container item xs={12} className="centered_container input_container">
                <Grid item xs={12} className="centered_container"><FormInput placeholder="Password" type="password" value={password} updateValue={e => setPassword(e)}></FormInput></Grid>
                {passwordError !== "" && (<Grid item xs={12} className="centered_container"><label className="errorLabel">{passwordError}</label></Grid>)}
            </Grid>
            <Grid container item xs={12} className="centered_container button_container">
                <MainButton text="Create my account" shadowClass="sub" click={checkAndSendAccountInfos}></MainButton>
            </Grid>
        </Grid >
    );
}

export default SignupForm