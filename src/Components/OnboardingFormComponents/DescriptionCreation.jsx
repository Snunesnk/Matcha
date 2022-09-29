import React from "react";
import "./OnboardingForm.css"
import { useStoreContext } from "../../Reducer/StoreContext";

const DescriptionCreation = ({ setOnboardingState, onboardingStateList }) => {
    const { state, dispatch } = useStoreContext();

    return (
        <div id="">
            What is your description ?
            <button id="onboarding_next_button" onClick={() => { setOnboardingState(onboardingStateList.interestsTags) }}>Get set up</button>
        </div>
    );
}

export default DescriptionCreation