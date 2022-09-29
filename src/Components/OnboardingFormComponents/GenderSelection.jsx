import React from "react";
import { Grid } from "@mui/material";
import "./OnboardingForm.css"
import { useStoreContext } from "../../Reducer/StoreContext";

const GenderSelection = ({ setOnboardingState, onboardingStateList }) => {
    const { state, dispatch } = useStoreContext();

    return (
        <div id="gender_selection_container">
            <p id="gender_selection_catch_phrase">What is <b>your gender?</b></p>

            <Grid container id="choice_list" rowGap={2}>
                <Grid item xs={12}>
                    <div className="gender_choice_container">
                        <div class="gender_choice_number">A</div>
                        <label>Female</label>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="gender_choice_container">
                        <div class="gender_choice_number">B</div>
                        <label>Male</label>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="gender_choice_container">
                        <div class="gender_choice_number">C</div>
                        <label>Non-binary</label>
                    </div>
                </Grid>
            </Grid>

            <button id="gender_selection_next_btn" onClick={() => { setOnboardingState(onboardingStateList.sexualOrientation) }}>OK</button>
        </div >
    );
}

export default GenderSelection