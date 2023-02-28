import React, { useEffect, useState } from 'react'
import './OnboardingForm.css'

const MESSAGES = {
    pending: 'It should take a few second to process your request.',
    verified: 'Your email is now verified, you can close this and continue.',
    error: 'An error occured, please close this and try again',
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
            if (res.status != 200) {
                setMessage(MESSAGES.error)
            } else {
                // Tell other tabs that email is now verified
                const verifChannel = new BroadcastChannel('email_verification')
                verifChannel.postMessage('verified')

                setMessage(MESSAGES.verified)
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
