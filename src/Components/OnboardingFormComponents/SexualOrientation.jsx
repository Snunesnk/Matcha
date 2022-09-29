import React from "react";
import "./OnboardingForm.css"
import { useStoreContext } from "../../Reducer/StoreContext";

const SexualOrientation = ({ setOnboardingState, onboardingStateList }) => {
    const { state, dispatch } = useStoreContext();

    return (
        <div id="">
            What is your sexual orientation ?
            <button id="onboarding_next_button" onClick={() => { setOnboardingState(onboardingStateList.descriptionCreation) }}>Get set up</button>
        </div>
    );
}

export default SexualOrientation