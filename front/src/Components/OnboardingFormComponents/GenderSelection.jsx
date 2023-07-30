import React from 'react'
import { Grid } from '@mui/material'
import ListChoice from '../ListChoice'
import { useDispatch } from 'react-redux'
import './OnboardingForm.css'
import { USER_STATE_ACTIONS } from '../../constants'
import OnboardingCard from '../OnboardingCard/OnboardingCard'

const Genders = [
    { number: 'A', name: 'Female', label: 'f' },
    { number: 'B', name: 'Male', label: 'm' },
    { number: 'C', name: 'Non-binary', label: 'nb' },
]

const GenderSelection = () => {
    const dispatch = useDispatch()

    const onGenderSelection = (label) => {
        dispatch({ type: USER_STATE_ACTIONS.UPDATE_GENDER, payload: label })
    }

    const header = (
        <p id="gender_selection_catch_phrase">
            What is <b>your gender?</b>
        </p>
    )
    const content = (
        <div id="choice_list">
            {Genders.map((gender) => (
                <ListChoice
                    number={gender.number}
                    name={gender.name}
                    label={gender.label}
                    key={gender.number}
                    onclick={onGenderSelection}
                    to="/onboarding/preferences"
                />
            ))}
        </div>
    )

    return (
        <OnboardingCard
            header={header}
            content={content}
            next={'/onboarding/preferences'}
            btnText={'Next'}
            btnClass="sm"
        />
    )
}

export default GenderSelection
