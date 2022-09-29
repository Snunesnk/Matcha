import React from "react";
import "./OnboardingForm.css"
import { useStoreContext } from "../../Reducer/StoreContext";

const InterestsTags = ({ setOnboardingState, onboardingStateList }) => {
    const { state, dispatch } = useStoreContext();

    return (
        <div id="">
            What is your interest tag ?
            <button id="onboarding_next_button" onClick={() => { setOnboardingState(onboardingStateList.picturesUploading) }}>Get set up</button>
        </div>
    );
}

export default InterestsTags