import { Form, useActionData, redirect } from 'react-router-dom';
import { Grid } from "@mui/material";
import MainButton from '../MainButton/MainBtn';
import FormInput from "../FormInput/FormInput";
import { validationErrors } from '../../constants';
import "./OnboardingForm.css"

const checkPassword = (password) => {
    // Password => must not be empty
    if (password === "") {
        return validationErrors.fieldEmpty;
    }
    // Password => must be at least 12 character long
    if (password.length < 12) {
        return validationErrors.invalidPasswordLength;
    }
    // Password => must have at least 1 uppercase char
    else if (!hasLowercase(password)) {
        return validationErrors.missingPasswordLowercase;
    }
    // Password => must have at least 1 lowercase char
    else if (!hasUppercase(password)) {
        return validationErrors.missingPasswordUppercase;
    }
    // Password => must have at least 1 digit
    else if (!hasDigit(password)) {
        return validationErrors.missingPasswordDigit;
    }

    return "";
}

function hasUppercase(passwd) {
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


export async function action({ request }) {
    const formData = await request.formData();

    const passwordError = checkPassword(formData.get("password"));

    if (passwordError === "") {
        /// Save email and name to be able to use it later
        localStorage.setItem("email", formData.get("email"));
        localStorage.setItem("name", formData.get("firstName"));

        // Send data to controller to create an user

        return redirect("/onboarding/validation");
    }

    return passwordError;
}


const SignupForm = () => {
    const passwordError = useActionData();

    return (
        <Form method='post'>
            <Grid container item id="onboarding_sign_up">
                <Grid item xs={12} className="centered_container onboarding_title center_align"><h1>MatChat</h1></Grid>
                <Grid item xs={12} className="centered_container catch_phrase center_align"><h3>Create your account to find your catmate</h3></Grid>
                <Grid container item xs={12} className="centered_container input_container">
                    <Grid item xs={12} className="centered_container">
                        <FormInput placeholder="First Name" name="firstName" required={true} />
                    </Grid>
                </Grid>
                <Grid container item xs={12} className="centered_container input_container">
                    <Grid item xs={12} className="centered_container">
                        <FormInput placeholder="Last Name" name="lastName" required={true} />
                    </Grid>
                </Grid>
                <Grid container item xs={12} className="centered_container input_container">
                    <Grid item xs={12} className="centered_container">
                        <FormInput placeholder="Username" name="username" required={true} />
                    </Grid>
                </Grid>
                <Grid container item xs={12} className="centered_container input_container">
                    <Grid item xs={12} className="centered_container">
                        <FormInput placeholder="Email" type="email" name="email" required={true} />
                    </Grid>
                </Grid>
                <Grid container item xs={12} className="centered_container input_container">
                    <Grid item xs={12} className="centered_container">
                        <FormInput placeholder="Password" type="password" name="password" required={true} />
                    </Grid>
                    {passwordError && (
                        <Grid item xs={12} className="centered_container"><label className="errorLabel">{passwordError}</label></Grid>
                    )}
                </Grid>
                <Grid container item xs={12} className="centered_container button_container">
                    <MainButton text="Create my account" shadowClass="sub" submit="true"></MainButton>
                </Grid>
            </Grid >
        </Form >
    );
}

export default SignupForm