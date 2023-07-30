import React from 'react'
import './OnboardingForm.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import OnboardingCard from '../OnboardingCard/OnboardingCard'

const WelcomeMessage = () => {
    const login = useSelector((state) => state.userState.userInfos.login)

    const header = <h1 id="welcome_title">Welcome to MatChat</h1>
    const content = (
        <div>
            <h2 id="welcome_catchphrase">
                Hello {login}, let's get you set up
            </h2>
            <p id="welcome_message">
                It only takes a moment.
                <br />
                And it'll make your time with MatChat even better.
            </p>
        </div>
    )

    return (
        <OnboardingCard
            header={header}
            content={content}
            next={'/onboarding/gender'}
            btnText={'Get set up'}
        />
    )
}

export default WelcomeMessage
