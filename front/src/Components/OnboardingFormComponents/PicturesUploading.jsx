import React from "react";
import "./OnboardingForm.css"
import ImageUpload from "../ImageUpload";
import { Link } from "react-router-dom";

const PicturesUploading = () => {
    const savePictures = () => {
        /// Save pictures in local storage
    }

    return (
        <div id="gender_selection_container">
            <p id="gender_selection_catch_phrase">Upload <b>your pictures</b> (5 max)</p>

            <ImageUpload></ImageUpload>

            <Link to="/onboarding/done">
                <button id="onboarding_next_button" onClick={savePictures}>Finish</button>
            </Link>
        </div>
    );
}

export default PicturesUploading