import React from "react";
import "./OnboardingForm.css"
import { useStoreContext } from "../../Reducer/StoreContext";

const PicturesUploading = ({ setOnboardingState, onboardingStateList }) => {
    const { state, dispatch } = useStoreContext();

    return (
        <div id="">
            What is your picture ?
            <button id="onboarding_next_button" onClick={() => { setOnboardingState(onboardingStateList.allSetMessage) }}>Get set up</button>
        </div>
    );
}

export default PicturesUploading