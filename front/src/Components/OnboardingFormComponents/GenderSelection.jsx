import React from "react";
import { Grid } from "@mui/material";
import "./OnboardingForm.css"
import { useStoreContext } from "../../Reducer/StoreContext";
import ListChoice from "../ListChoice";

const Genders = [
    { number: 'A', label: 'Female' },
    { number: 'B', label: 'Male' },
    { number: 'C', label: 'Non-binary' },
]

const GenderSelection = ({ setOnboardingState, onboardingStateList }) => {
    const OnGenderSelection = () => {
        setOnboardingState(onboardingStateList.sexualOrientation)
    }

    return (
        <div id="gender_selection_container">
            <p id="gender_selection_catch_phrase">What is <b>your gender?</b></p>

            <Grid container id="choice_list" rowGap={2}>
                {Genders.map(gender => (
                    <ListChoice
                        number={gender.number}
                        label={gender.label}
                        key={gender.number}
                        onclick={OnGenderSelection}></ListChoice>
                ))}
            </Grid>
        </div >
    );
}

export default GenderSelection;