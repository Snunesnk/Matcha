import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { redirect, useNavigate } from 'react-router'
import { USER_STATE_ACTIONS } from '../../constants'
import './OnboardingForm.css'

const setListenerForValidation = (setVerified) => {
    const verifChannel = new BroadcastChannel('email_verification')

    verifChannel.onmessage = (e) => {
        if (e.data === 'verified') {
            setVerified(true)
        }
    }
}

const EmailValidation = () => {
    const userInfos = useSelector((state) => state.userState.userInfos)
    const [verified, setVerified] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    setListenerForValidation(setVerified)

    useEffect(() => {
        if (verified == true) {
            dispatch({ type: USER_STATE_ACTIONS.VERIFY })
            navigate('/onboarding/welcome')
        }
    }, [verified])

    const resendMail = () => {
        fetch('http://localhost:8080/api/user/verify/' + userInfos.login, {
            method: 'POST',
        })
    }

    return (
        <div id="onboarding_email_validation">
            <h2>Hi {userInfos.name},</h2>
            <p>
                We sent an email to <b>{userInfos.email}</b>
                <br />
                Please check your inbox to activate your account.
            </p>
            <h6 className="send-email-again-msg">
                Did not receive it ? You can{' '}
                <a onClick={resendMail}>send it again</a>
            </h6>
        </div>
    )
}

export default EmailValidation
