import React from 'react'
import './OnboardingForm.css'

const setListenerForValidation = () => {
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
        }
    }

    window.addEventListener('storage', sessionStorage_transfer, false)
}

const EmailValidated = () => {
    const setValidation = () => {
        console.log('set validation')
        localStorage.setItem('sessionStorage', 'validated')
    }

    setListenerForValidation()

    return (
        <div id="onboarding_email_validation">
            <p>
                Your email is validated, you can now close this tab and
                continue.
            </p>
            <h6 className="send-email-again-msg">
                Set cookie validation
                <a onClick={setValidation}>send it again</a>
            </h6>
        </div>
    )
}

export default EmailValidated
