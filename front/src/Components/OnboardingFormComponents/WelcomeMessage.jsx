import React from 'react'
import './OnboardingForm.css'
import { Link } from 'react-router-dom'

const WelcomeMessage = () => {
    // DEBUG, I shoud be getting it from the email link directly
    const name = sessionStorage.getItem('name')

    return (
        <div id="onboarding_welcome_message">
            <h1 id="welcome_title">Welcome to MatChat</h1>
            {/* <h2 id="welcome_catchphrase">Hello {state.user.username}, let's get you set up</h2> */}
            <h2 id="welcome_catchphrase">Hello {name}, let's get you set up</h2>
            <p id="welcome_message">
                It only takes a moment.
                <br />
                And it'll make your time with MatChat even better.
            </p>
            <Link to="/onboarding/gender">
                <button id="onboarding_next_button">Get set up</button>
            </Link>
        </div>
    )
}

export default WelcomeMessage
