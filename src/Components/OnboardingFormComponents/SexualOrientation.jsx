import React from "react";
import { Grid } from "@mui/material";
import "./OnboardingForm.css"
import { useStoreContext } from "../../Reducer/StoreContext";
import ListChoice from "../ListChoice";

const Orientations = [
    { number: 'A', label: 'Heterosexual' },
    { number: 'B', label: 'Gay' },
    { number: 'C', label: 'Bisexual' },
    { number: 'D', label: 'Pansexual' },
]

const SexualOrientation = ({ setOnboardingState, onboardingStateList }) => {

    const OnOrientationsSelection = () => {
        setOnboardingState(onboardingStateList.descriptionCreation)
    }

    return (
        <div id="gender_selection_container">
            <p id="gender_selection_catch_phrase">What is <b>your sexual orientation?</b></p>

            <Grid container id="choice_list" rowGap={2}>
                {Orientations.map(orientation => (
                    <ListChoice
                        number={orientation.number}
                        label={orientation.label}
                        key={orientation.number}
                        onclick={OnOrientationsSelection}></ListChoice>
                ))}
            </Grid>
        </div >
    );
}

export default SexualOrientation