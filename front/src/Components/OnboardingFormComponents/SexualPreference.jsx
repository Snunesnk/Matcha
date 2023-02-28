import React from 'react'
import { Grid } from '@mui/material'
import './OnboardingForm.css'
import ListChoice from '../ListChoice'
import { Link } from 'react-router-dom'

const Preferences = [
    { number: 'A', label: 'Female' },
    { number: 'B', label: 'Male' },
    { number: 'C', label: 'Non-binary' },
]

const SexualPreferences = () => {
    const genderSelected = []

    const OnPreferenceSelection = (e, number, label) => {
        if (genderSelected.indexOf(label) >= 0)
            genderSelected.splice(genderSelected.indexOf(label), 1)
        else genderSelected.push(label)
    }

    const savePreferences = () => {
        sessionStorage.setItem('preferences', genderSelected)
    }

    return (
        <div id="gender_selection_container">
            <p id="gender_selection_catch_phrase">
                Who do you want to <b>see?</b>
            </p>

            <Grid container id="choice_list" rowGap={2}>
                {Preferences.map((preference) => (
                    <ListChoice
                        number={preference.number}
                        label={preference.label}
                        key={preference.number}
                        onclick={OnPreferenceSelection}
                    />
                ))}
            </Grid>

            <Link to="/onboarding/bio">
                <button id="onboarding_next_button" onClick={savePreferences}>
                    Next
                </button>
            </Link>
        </div>
    )
}

export default SexualPreferences
