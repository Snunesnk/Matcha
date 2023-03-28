import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { USER_STATE_ACTIONS } from '../../constants'
import './OnboardingForm.css'

const DescriptionCreation = () => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()

    const saveBio = () => {
        dispatch({ type: USER_STATE_ACTIONS.UPDATE_BIO, payload: value })
    }

    return (
        <div id="gender_selection_container">
            <p id="gender_selection_catch_phrase">
                Tell us more about <b>yourself</b> (max 100 char)
            </p>

            <textarea
                id="description_creation_input"
                placeholder="Enter your description here"
                maxLength="100"
                rows="8"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            ></textarea>

            <div>
                <Link to="/onboarding/interests">
                    <button id="onboarding_next_button" onClick={saveBio}>
                        That's me!
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default DescriptionCreation
