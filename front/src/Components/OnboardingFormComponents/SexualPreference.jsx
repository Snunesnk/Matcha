import React from 'react'
import { Grid } from '@mui/material'
import './OnboardingForm.css'
import ListChoice from '../ListChoice'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { USER_STATE_ACTIONS } from '../../constants'
import OnboardingCard from '../OnboardingCard/OnboardingCard'

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

    const header = (
        <p id="gender_selection_catch_phrase">
            Who do you want to <b>see?</b>
        </p>
    )

    const content = (
        <div id="choice_list">
            {Preferences.map((preference) => (
                <ListChoice
                    number={preference.number}
                    name={preference.name}
                    label={preference.label}
                    key={preference.number}
                    onclick={OnPreferenceSelection}
                />
            ))}
        </div>
    )

    return (
        <OnboardingCard
            header={header}
            content={content}
            next={'/onboarding/bio'}
            btnText={'Next'}
            onClick={savePreferences}
        />
    )
}

export default SexualPreferences
