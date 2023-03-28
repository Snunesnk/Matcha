import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'

import './Button.css'

export const AlreadyHaveAccountBtn = () => {
    const navigate = useNavigate()

    const goToLogin = () => {
        navigate('/login')
    }

    return (
        <div id="already_have_account">
            <label id="alreadyHaveLabel">Already have an account?</label>
            <Button
                btnClass="alreadyHaveButton"
                text="Log in"
                onClick={goToLogin}
            ></Button>
        </div>
    )
}

export const QuitOnboarding = () => (
    <Link to="/" className="onboardingBack">
        <KeyboardArrowLeftIcon className="onboardingBackIcon"></KeyboardArrowLeftIcon>
        <label className="onboardingBackLabel">Quit</label>
    </Link>
)

const Button = ({ text, btnClass, onClick = () => {} }) => {
    return (
        <button className={'btn ' + btnClass} onClick={onClick}>
            {text}
        </button>
    )
}

export default Button
