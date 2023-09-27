import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { USER_STATE_ACTIONS } from '../../constants'
import './OnboardingForm.css'
import OnboardingCard from '../OnboardingCard/OnboardingCard'

const DescriptionCreation = () => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()

    const saveBio = () => {
        dispatch({ type: USER_STATE_ACTIONS.UPDATE_BIO, payload: value })
    }

    const header = (
        <p id="gender_selection_catch_phrase">
            Tell us more <b>about yourself</b>
            <br />
            <i>100 characters, all about you!</i>
        </p>
    )

    const content = (
        <textarea
            id="description_creation_input"
            placeholder="Enter your description here"
            maxLength="100"
            rows="8"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        ></textarea>
    )

    return (
        <OnboardingCard
            header={header}
            content={content}
            next={'/onboarding/interests'}
            btnText={"That's me!"}
            onClick={saveBio}
            btnClass="sm"
        />
    )
}

export default DescriptionCreation
