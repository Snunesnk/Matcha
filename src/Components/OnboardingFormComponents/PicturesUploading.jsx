import React from "react";
import "./OnboardingForm.css"
import ImageUpload from "../ImageUpload";

const PicturesUploading = ({ setOnboardingState, onboardingStateList }) => {
    return (
        <div id="gender_selection_container">
            <p id="gender_selection_catch_phrase">Upload <b>your pictures</b> (5 max)</p>

            <ImageUpload></ImageUpload>

            <button id="onboarding_next_button" onClick={() => { setOnboardingState(onboardingStateList.allSetMessage) }}>Get set up</button>
        </div>
    );
}

export default PicturesUploading