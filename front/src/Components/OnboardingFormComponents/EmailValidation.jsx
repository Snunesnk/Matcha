import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import './OnboardingForm.css'
import ApiService from '../../Services/api.service'

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
        ApiService.post('/user/verify/' + userInfos.email)
            .then(() => {
                setMessage(
                    'Email sent! Please wait 5 minutes before sending a new one'
                )
            })
            .catch(async (error) => {
                switch (error.status) {
                    case 400:
                        const data = await error.response.json()
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
                    default:
                        setMessage('Something went wrong')
                        console.log(error)
                        break
                }
            })
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
