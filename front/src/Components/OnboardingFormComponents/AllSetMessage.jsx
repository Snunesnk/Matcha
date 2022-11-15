import React from "react";
import { Link } from "react-router-dom";
import "./OnboardingForm.css"

const AllSetMessage = () => {
    const sendForm = () => {
        // Send form to controller
    }

    return (
        <div id="gender_selection_container">
            <p id="gender_selection_catch_phrase"><b>Fantastic, you're all set :)</b></p>
            <p>Are you ready to find your catmate?</p>

            <Link to="/dashboard">
                <button id="onboarding_next_button" onClick={sendForm}>Let the magic begin!</button>
            </Link>
        </div>
    );
}

export default AllSetMessage