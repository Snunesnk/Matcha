import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./OnboardingForm.css"

const DescriptionCreation = () => {
    const [value, setValue] = useState("");

    const saveBio = () => {
        console.log(value);
    }

    return (
        <div id="gender_selection_container">
            <p id="gender_selection_catch_phrase">Tell us more about <b>yourself</b> (max 100 char)</p>

            <textarea
                id="description_creation_input"
                placeholder="Enter your description here"
                maxLength="100"
                rows="8"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            ></textarea>

            <Link to="/onboarding/interests">
                <button id="onboarding_next_button" onClick={saveBio}>That's me !</button>
            </Link>
        </div>
    );
}

export default DescriptionCreation