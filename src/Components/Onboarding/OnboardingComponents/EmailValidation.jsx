import React from "react";
import "../Onboarding.css"
import { useStoreContext } from "../../../Reducer/StoreContext";

const EmailValidation = () => {
    const { state, dispatch } = useStoreContext();

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