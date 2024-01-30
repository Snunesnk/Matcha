import React, { useEffect, useState } from 'react'
import FormInput from '../../../Components/FormInput/FormInput'
import { checkPassword, hashPassword } from '../../../utils'
import { validationErrors } from '../../../constants'
import { CircularProgress } from '@mui/material'
import ApiService from '../../../Services/api.service'

// TODO: Handle back status code response
const ChangePassword = ({ login, token }) => {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [loading, setLoading] = useState(false)
    const [confirmChange, setConfirmChange] = useState(false)

    useEffect(() => {
        const res = checkPassword(newPassword)

        if (res !== validationErrors.noValidationError) {
            setPasswordError(res)
        } else {
            setPasswordError('')
        }
    }, [newPassword])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)

        const hashedPassword = await hashPassword(newPassword)

        ApiService.post('/user/reset-password', {
            token,
            login,
            hashedPassword,
        })
            .then((data) => {
                setLoading(false)
                setConfirmChange(true)
            })
            .catch((error) => {
                console.log(error)
                switch (error.status) {
                    case 401:
                        setPasswordError('Invalid token.')
                        break
                    case 404:
                        setPasswordError('User not found.')
                        break
                    case 400:
                        setPasswordError('Missing field.')
                        break
                    default:
                        setPasswordError('Something went wrong.')
                }
                setLoading(false)
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
                        name="password"
                        required={true}
                        updateValue={setNewPassword}
                        type="password"
                    />
                    <p className="password-error">{passwordError}</p>
                </div>
                <div className="password-reset-field">
                    <FormInput
                        placeholder="Confirm password"
                        name="new-password"
                        required={true}
                        updateValue={setConfirmPassword}
                        type="password"
                    />
                    <p className="password-error">
                        {passwordError === '' &&
                            !passwordsMatch &&
                            'Passwords do not match.'}
                    </p>
                    <p className="password-change">
                        {confirmChange && 'Password changed successfully.'}
                    </p>
                </div>
                {!confirmChange ? (
                    <button
                        type="submit"
                        disabled={!passwordsMatch || loading}
                        className="btn signup-btn reset-password-btn"
                    >
                        {loading ? <CircularProgress /> : 'Change password'}
                    </button>
                ) : (
                    <button className="btn signup-btn reset-password-btn pink">
                        Go to login
                    </button>
                )}
            </form>
        </div>
    )
}

export default ChangePassword
