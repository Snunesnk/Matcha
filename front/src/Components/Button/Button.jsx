import React from 'react'
import { Link } from 'react-router-dom'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'

import './Button.css'

export const AlreadyHaveAccountBtn = () => (
    <div id="already_have_account">
        <label id="alreadyHaveLabel">Already have an account?</label>
        <Button btnClass="alreadyHaveButton" text="Log in"></Button>
    </div>
)

export const QuitOnboarding = () => (
    <Link to="/" className="onboardingBack">
        <KeyboardArrowLeftIcon className="onboardingBackIcon"></KeyboardArrowLeftIcon>
        <label className="onboardingBackLabel">Quit</label>
    </Link>
)

const Button = ({ text, btnClass }) => {
    return <button className={'btn ' + btnClass}>{text}</button>
}

export default Button
