import React from "react";
import "./OnboardingForm.css"
import { useNavigate } from "react-router-dom";

const EmailValidation = () => {
    // Get email and name
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name");

    /// ONLY FOR DEBUG
    const navigate = useNavigate();
    setTimeout(() => {
        navigate("/onboarding/welcome")
    }, 1000);

    return (
        <div id="onboarding_email_validation">
            {/* <h2>Hi {state.user.username},</h2> */}
            <h2>Hi {name},</h2>
            <p>
                {/* We sent an email to <b>{state.user.email}</b> */}
                We sent an email to <b>{email}</b>
                <br />
                Please check your inbox to activate your account.
            </p>
        </div>
    );
}

export default EmailValidation