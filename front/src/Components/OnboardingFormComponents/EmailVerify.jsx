import React, { useEffect, useState } from 'react'
import './OnboardingForm.css'

const MESSAGES = {
    pending: 'It should take a few second to process your request.',
    verified:
        'Your email is now verified, you can close this page and log in to access your account.',
    invalid_token:
        "Invalid token. If you can't log in, try sending a new mail.",
    error: 'An error occured, please close this page and try again',
}

const sendVerificationRequest = async (login, token) => {
    const queryUrl =
        'http://localhost:8080/api/user/verify/' + login + '/' + token

    return fetch(queryUrl, {
        method: 'GET',
    })
}

const EmailVerify = () => {
    const [message, setMessage] = useState(MESSAGES.pending)
    const urlParams = new URLSearchParams(window.location.search)
    const login = urlParams.get('login')
    const token = urlParams.get('token')

    useEffect(() => {
        sendVerificationRequest(login, token).then((res) => {
            switch (res.status) {
                case 200:
                    // Tell other tabs that email is now verified
                    const verifChannel = new BroadcastChannel(
                        'email_verification'
                    )
                    verifChannel.postMessage('verified')

                    setMessage(MESSAGES.verified)
                    break
                case 401:
                    setMessage(MESSAGES.invalid_token)
                    break
                case 500:
                default:
                    setMessage(MESSAGES.error)
                    break
            }
        })
    }, [])

    return (
        <div id="onboarding_email_validation">
            <p>{message}</p>
        </div>
    )
}

export default EmailVerify
