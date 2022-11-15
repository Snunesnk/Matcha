import React from "react";
import "./OnboardingForm.css"
import { useStoreContext } from "../../Reducer/StoreContext";

const EmailValidation = ({ setOnboardingState, onboardingStateList }) => {
    const { state, dispatch } = useStoreContext();

    setTimeout(() => {
        setOnboardingState(onboardingStateList.welcomeMessage);
    }, 1000);

    return (
        <div id="onboarding_email_validation">
            <h2>Hi {state.user.username},</h2>
            <p>
                We sent an email to <b>{state.user.email}</b>
                <br />
                Please check your inbox to activate your account.
            </p>
        </div>
    );
}

export default EmailValidation