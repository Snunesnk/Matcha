import React from "react";
import "./OnboardingForm.css"
import { useStoreContext } from "../../Reducer/StoreContext";

const DescriptionCreation = ({ setOnboardingState, onboardingStateList }) => {
    const { state, dispatch } = useStoreContext();

    return (
        <div id="gender_selection_container">
            <p id="gender_selection_catch_phrase">Tell us more about <b>yourself</b> (max 100 char)</p>

            <textarea
                id="description_creation_input"
                placeholder="Enter your description here"
                maxLength="100"
                rows="8"
            ></textarea>

            <button id="onboarding_next_button" onClick={() => { setOnboardingState(onboardingStateList.interestsTags) }}>That's me !</button>
        </div>
    );
}

export default DescriptionCreation