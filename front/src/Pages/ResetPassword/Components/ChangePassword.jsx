import React, { useEffect, useState } from 'react'
import FormInput from '../../../Components/FormInput/FormInput'
import { checkPassword } from '../../../utils'
import { validationErrors } from '../../../constants'

const ChangePassword = ({ login }) => {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')

    useEffect(() => {
        const res = checkPassword(newPassword)

        if (res !== validationErrors.noValidationError) {
            setPasswordError(res)
        } else {
            setPasswordError('')
        }
    }, [newPassword])

    const handleSubmit = (event) => {
        event.preventDefault()

        const hashedPassword = hashPassword(newPassword)
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, login, hashedPassword }),
        }

        fetch('http://localhost:8080/api/user/reset-password', options)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const passwordsMatch =
        newPassword && confirmPassword && newPassword === confirmPassword

    return (
        <div>
            <h2>Reset your password</h2>
            <p>Hi {login}, please enter your new password</p>
            <form className="reset-password-form" onSubmit={handleSubmit}>
                <div className="password-reset-field">
                    <FormInput
                        placeholder="Password"
                        name=""
                        required={true}
                        updateValue={setNewPassword}
                        type="password"
                    />
                    <label className="password-error">{passwordError}</label>
                </div>
                <div className="password-reset-field">
                    <FormInput
                        placeholder="Confirm password"
                        name=""
                        required={true}
                        updateValue={setConfirmPassword}
                        type="password"
                    />
                    <label className="password-error">
                        {newPassword &&
                            confirmPassword &&
                            passwordError === '' &&
                            !passwordsMatch &&
                            'Passwords do not match.'}
                    </label>
                </div>
                <button
                    type="submit"
                    disabled={!passwordsMatch}
                    className="btn signup-btn"
                >
                    Change password
                </button>
            </form>
        </div>
    )
}

export default ChangePassword
