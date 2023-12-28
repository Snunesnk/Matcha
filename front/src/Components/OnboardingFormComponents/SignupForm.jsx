import React from 'react'
import { Form, useActionData, useNavigate } from 'react-router-dom'
import FormInput from '../FormInput/FormInput'
import { USER_STATE_ACTIONS, validationErrors } from '../../constants'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import './OnboardingForm.css'
import { checkPassword, hashPassword } from '../../utils'

const checkDate = (date) => {
    const today = new Date()
    const userDate = new Date(date)
    const userAge = today.getFullYear() - userDate.getFullYear()

    // do not accept future dates
    if (userDate.getTime() > today.getTime()) {
        return validationErrors.invalidDate
    }

    // Too young
    if (userAge < 18) return validationErrors.userTooYoung
    // Same year, so check if user is already 18 or not
    else if (userAge === 18) {
        if (today.getMonth() < userDate.getMonth())
            return validationErrors.userTooYoung
        else if (today.getMonth() === userDate.getMonth()) {
            if (today.getDate() < userDate.getDate())
                return validationErrors.userTooYoung
        }
    }

    return validationErrors.noValidationError
}

export async function action({ request }) {
    const formData = await request.formData()
    const data = {
        name: formData.get('lastName'),
        email: formData.get('email'),
        surname: formData.get('firstName'),
        login: formData.get('username'),
        password: formData.get('password'),
        dateOfBirth: formData.get('dateOfBirth'),
    }

    let error = checkPassword(data.password)

    if (error === validationErrors.noValidationError)
        error = checkDate(data.dateOfBirth)

    if (error === validationErrors.noValidationError) {
        data.password = await hashPassword(data.password)

        // Send data to controller to create an user
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
        await fetch('http://localhost:8080/api/user', options).then(
            (response) => {
                switch (response.status) {
                    case 400:
                        error = validationErrors.missingData
                        break

                    default:
                    case 500:
                        error = validationErrors.genericProfileCreationError
                        break

                    case 200:
                        error = validationErrors.noValidationError
                        break
                }
            }
        )
    }

    return { ...data, error }
}

// TODO: Handle back status code response
const SignupForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formResult = useActionData()

    useEffect(() => {
        if (
            formResult &&
            formResult.error === validationErrors.noValidationError
        ) {
            dispatch({
                type: USER_STATE_ACTIONS.LOG_IN,
                payload: {
                    email: formResult.email,
                    name: formResult.name,
                    login: formResult.login,
                    loggedIn: true,
                },
            })
            navigate('/validation')
        }
    }, [formResult])

    return (
        <div id="test-div">
            <div id="left-div">
                <div></div>
            </div>
            <div id="right-div">
                <Form id="onboarding_form" method="post">
                    <h3 id="signup_title">
                        Create your account to find your catmate
                    </h3>
                    <div>
                        <div className="form-double-field">
                            <FormInput
                                placeholder="First Name"
                                name="firstName"
                                required={true}
                            />
                        </div>
                        <div className="form-double-field">
                            <FormInput
                                placeholder="Last Name"
                                name="lastName"
                                required={true}
                            />
                        </div>
                    </div>
                    <div>
                        <FormInput
                            placeholder="Birth date"
                            type="date"
                            name="dateOfBirth"
                            required={true}
                        />
                    </div>
                    <div>
                        <FormInput
                            placeholder="Username"
                            name="username"
                            required={true}
                        />
                    </div>
                    <div>
                        <FormInput
                            placeholder="Email"
                            type="email"
                            name="email"
                            required={true}
                        />
                    </div>
                    <div>
                        <FormInput
                            placeholder="Password"
                            type="password"
                            name="password"
                            required={true}
                        />
                    </div>
                    {formResult &&
                        formResult.error !==
                            validationErrors.noValidationError && (
                            // <div className="centered_container">
                            <label className="errorLabel">
                                {formResult.error}
                            </label>
                            // </div>
                        )}
                    <button className="btn signup-btn" type="submit">
                        Create my account
                    </button>
                </Form>
            </div>
        </div>
    )
}

export default SignupForm
