import React from 'react'
import { Link } from 'react-router-dom'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import { useDispatch } from 'react-redux'
import './Button.css'

export const AlreadyHaveAccountBtn = () => (
    <div id="already_have_account">
        <label id="alreadyHaveLabel">Already have an account?</label>
        <Link to="/login" className="alreadyHaveButton">
            Login
        </Link>
    </div>
)

export const LogoutBtn = () => (
    // const dispatch = useDispatch()
    <Button text="logout" btnClass="alreadyHaveButton"/>
)

export const QuitOnboarding = () => (
    <Link to="/" className="onboardingBack">
        <KeyboardArrowLeftIcon className="onboardingBackIcon"></KeyboardArrowLeftIcon>
        <label className="onboardingBackLabel">Quit</label>
    </Link>
)

const Button = ({ text, btnClass, setState }) => {
    return <button className={btnClass + ' btn'} onClick={setState}>{text}</button>
}

export default Button
