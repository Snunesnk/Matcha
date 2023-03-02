import React, { useState } from 'react'
import './OnboardingForm.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { USER_STATE_ACTIONS } from '../../constants'

const WelcomeMessage = () => {
    const login = useSelector((state) => state.userState.userInfos.login)
    const dispatch = useDispatch()

    const saveBirthDate = () => {
        dispatch({ type: USER_STATE_ACTIONS.UPDATE_BIRTHDATE, payload: date })
    }

    return (
        <div id="onboarding_welcome_message">
            <h1 id="welcome_title">Welcome to MatChat</h1>
            {/* <h2 id="welcome_catchphrase">Hello {state.user.username}, let's get you set up</h2> */}
            <h2 id="welcome_catchphrase">
                Hello {login}, let's get you set up
            </h2>
            <p id="welcome_message">
                It only takes a moment.
                <br />
                And it'll make your time with MatChat even better.
            </p>
            <Link to="/onboarding/gender">
                <button id="onboarding_next_button" onClick={saveBirthDate}>
                    Get set up
                </button>
            </Link>
        </div>
    )
}

export default WelcomeMessage
