import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
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
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()

    setListenerForValidation(setVerified)

    useEffect(() => {
        if (verified == true) {
            navigate('/login')
        }
    }, [verified])

    const resendMail = () => {
        fetch('http://localhost:8080/api/user/verify/' + userInfos.email, {
            method: 'POST',
        })
            .then(async (res) => {
                switch (res.status) {
                    case 200:
                        setMessage(
                            'Email sent! Please wait 5 minutes before sending a new one'
                        )
                        break
                    case 400:
                        const data = await res.json()
                        setMessage(
                            'Please wait ' +
                                data?.cooldown +
                                ' before sending a new mail'
                        )
                        break
                    case 403:
                        setMessage(
                            'You are not allowed to send verification email'
                        )
                        break
                    case 500:
                    default:
                        setMessage('Something went wrong')
                        break
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <div id="onboarding_email_validation">
            <h2>Hi {userInfos.login},</h2>
            <p>
                We sent an email to <b>{userInfos.email}</b>
                <br />
                Please check your inbox to activate your account.
            </p>
            <h6 className="send-email-again-msg">
                Did not receive it ? You can{' '}
                <a onClick={resendMail}>send it again</a>
                <br />
                {message && <i>{message}</i>}
            </h6>
        </div>
    )
}

export default EmailValidation
