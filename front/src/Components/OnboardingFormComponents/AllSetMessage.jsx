import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { USER_STATE_ACTIONS } from '../../constants'
import './OnboardingForm.css'

const AllSetMessage = () => {
    const dispatch = useDispatch()
    const userState = useSelector((state) => state.userState.userSettings)

    const sendForm = () => {
        console.log(userState)
        // dispatch({ type: USER_STATE_ACTIONS.ONBOARDED })
    }

    return (
        <div id="gender_selection_container">
            <p id="gender_selection_catch_phrase">
                <b>Fantastic, you're all set :)</b>
            </p>
            <p>Are you ready to find your catmate?</p>

            <Link to="/dashboard">
                <button id="onboarding_next_button" onClick={sendForm}>
                    Let the magic begin!
                </button>
            </Link>
        </div>
    )
}

export default AllSetMessage
