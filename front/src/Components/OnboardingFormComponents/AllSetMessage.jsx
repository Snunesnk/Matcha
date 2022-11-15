import React from "react";
import "./OnboardingForm.css"
import { useStoreContext } from "../../Reducer/StoreContext";

const AllSetMessage = ({ setOnboardingState, onboardingStateList }) => {
    const { state, dispatch } = useStoreContext();

    return (
        <div id="gender_selection_container">
            <p id="gender_selection_catch_phrase"><b>Fantastic, you're all set :)</b></p>
            <p>Are you ready to find your catmate?</p>
            <button id="onboarding_next_button" onClick={() => { setOnboardingState(onboardingStateList.allSetMessage) }}>Let the magic begin!</button>
        </div>
    );
}

export default AllSetMessage