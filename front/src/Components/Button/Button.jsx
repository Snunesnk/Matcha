import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import { useDispatch } from 'react-redux'
import './Button.css'

export const AlreadyHaveAccountBtn = () => {
    const navigate = useNavigate()

    const navigateToLogin = () => {
        navigate('/login')
    }

    return (
        <div id="already_have_account">
            <p id="alreadyHaveLabel">Already a cool cat?</p>
            <Button
                btnClass="alreadyHaveButton"
                text="Log in"
                onClick={navigateToLogin}
            ></Button>
        </div>
    )
}

export const CreateAccountButton = () => {
    const navigate = useNavigate()

    const navigateToSignup = () => {
        navigate('/signup')
    }

    return (
        <div id="already_have_account">
            <p id="alreadyHaveLabel">New here?</p>
            <Button
                btnClass="alreadyHaveButton"
                text="Create account"
                onClick={navigateToSignup}
            ></Button>
        </div>
    )
}

export const LogoutBtn = () => (
    // const dispatch = useDispatch()
    <Button text="logout" btnClass="alreadyHaveButton" />
)

export const QuitOnboarding = () => (
    <Link to="/" className="onboardingBack">
        <KeyboardArrowLeftIcon className="onboardingBackIcon"></KeyboardArrowLeftIcon>
        <label className="onboardingBackLabel">Quit</label>
    </Link>
)

const Button = ({ text, btnClass, onClick }) => {
    return (
        <button className={btnClass + ' btn'} onClick={onClick}>
            {text}
        </button>
    )
}

export default Button
