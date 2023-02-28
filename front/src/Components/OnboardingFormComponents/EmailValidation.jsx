import React from 'react'
import { redirect } from 'react-router'
import './OnboardingForm.css'

const setListenerForValidation = () => {
    const verifChannel = new BroadcastChannel('email_verification')

    verifChannel.onmessage = (e) => {
        if (e.data === 'verified') {
            console.log('User verified')
            redirect('/onboarding/welcome')
        }
    }
}

const EmailValidation = () => {
    // Get email and name
    const email = sessionStorage.getItem('email')
    const name = sessionStorage.getItem('name')

    setListenerForValidation()

    const resendMail = () => {
        const login = sessionStorage.getItem('login')

        fetch('http://localhost:8080/api/user/verify/' + login, {
            method: 'POST',
        })
    }

    return (
        <div id="onboarding_email_validation">
            {/* <h2>Hi {state.user.username},</h2> */}
            <h2>Hi {name},</h2>
            <p>
                {/* We sent an email to <b>{state.user.email}</b> */}
                We sent an email to <b>{email}</b>
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
