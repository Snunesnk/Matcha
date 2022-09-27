import React from "react";
import "../Onboarding.css"
import { useStoreContext } from "../../../Reducer/StoreContext";

const WelcomeMessage = () => {
    const { state, dispatch } = useStoreContext();

    return (
        <div id="onboarding_welcome_message">
            <h1 id="welcome_title">Welcome to MatChat</h1>
            <h2 id="welcome_catchphrase">Hello {state.user.username}, let's get you set up</h2>
            <p id="welcome_message">
                It only takes a moment.
                <br />
                And it'll make your time with MatChat even better.
            </p>
            <button id="onboarding_next_button">Get set up</button>
            <label id="onboarding_next_button_label" for="onboarding_next_button">press Enter ↵</label>
        </div>
    );
}

export default WelcomeMessage