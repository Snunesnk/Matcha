import React from 'react'
import './OnboardingForm.css'
// import { useNavigate } from 'react-router-dom'

const setListenerForValidation = () => {
    console.log('got something')
    // transfers sessionStorage from one tab to another
    var sessionStorage_transfer = function (event) {
        if (!event.newValue) return // do nothing if no value to work with
        if (event.key == 'getSessionStorage') {
            // another tab asked for the sessionStorage -> send it
            localStorage.setItem(
                'sessionStorage',
                JSON.stringify(sessionStorage)
            )
            // the other tab should now have it, so we're done with it.
            localStorage.removeItem('sessionStorage') // <- could do short timeout as well.
        } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
            // another tab sent data <- get it
            var data = JSON.parse(event.newValue)
            for (var key in data) {
                sessionStorage.setItem(key, data[key])
            }

            console.log('Session storage: ' + JSON.stringify(sessionStorage))
        }
    }

    window.addEventListener('storage', sessionStorage_transfer, false)
}

const EmailValidation = () => {
    // Get email and name
    const email = sessionStorage.getItem('email')
    const name = sessionStorage.getItem('name')

    const resendMail = () => {
        const login = sessionStorage.getItem('login')

        fetch('http://localhost:8080/api/user/verify/' + login, {
            method: 'POST',
        })
    }
    /// ONLY FOR DEBUG
    // const navigate = useNavigate()
    // setTimeout(() => {
    //     navigate('/onboarding/welcome')
    // }, 1000)

    setListenerForValidation()

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
