import React from 'react'
import { Grid } from '@mui/material'
import './OnboardingForm.css'
import ListChoice from '../ListChoice'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { USER_STATE_ACTIONS } from '../../constants'

const Preferences = [
    { number: 'A', name: 'Female', label: 'f' },
    { number: 'B', name: 'Male', label: 'm' },
    { number: 'C', name: 'Non-binary', label: 'nb' },
]

const SexualPreferences = () => {
    const genderSelected = []
    const dispatch = useDispatch()

    const OnPreferenceSelection = (label) => {
        if (genderSelected.indexOf(label) >= 0)
            genderSelected.splice(genderSelected.indexOf(label), 1)
        else genderSelected.push(label)
    }

    const savePreferences = () => {
        const preferences = {
            prefMale: false,
            prefFemale: false,
            prefEnby: false,
        }

        genderSelected.forEach((gender) => {
            switch (gender) {
                case 'm':
                    preferences.prefMale = true
                    break
                case 'f':
                    preferences.prefFemale = true
                    break
                case 'nb':
                    preferences.prefEnby = true
                    break
            }
        })

        dispatch({
            type: USER_STATE_ACTIONS.UPADTE_PREFERENCES,
            payload: preferences,
        })
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
                        name={preference.name}
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
