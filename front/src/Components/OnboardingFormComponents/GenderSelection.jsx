import React from 'react'
import { Grid } from '@mui/material'
import ListChoice from '../ListChoice'
import { useDispatch } from 'react-redux'
import './OnboardingForm.css'
import { USER_STATE_ACTIONS } from '../../constants'

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

    return (
        <div id="gender_selection_container">
            <p id="gender_selection_catch_phrase">
                What is <b>your gender?</b>
            </p>

            <Grid container id="choice_list" rowGap={2}>
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
            </Grid>
        </div>
    )
}

export default GenderSelection
