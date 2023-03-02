import React from 'react'
import { Form, useActionData, useNavigate } from 'react-router-dom'
import { Grid } from '@mui/material'
import MainButton from '../MainButton/MainBtn'
import FormInput from '../FormInput/FormInput'
import { USER_STATE_ACTIONS, validationErrors } from '../../constants'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import './OnboardingForm.css'

const checkPassword = (password) => {
    // Password => must not be empty
    if (password === '') {
        return validationErrors.fieldEmpty
    }
    // Password => must be at least 12 character long
    if (password.length < 12) {
        return validationErrors.invalidPasswordLength
    }
    // Password => must have at least 1 uppercase char
    else if (!hasLowercase(password)) {
        return validationErrors.missingPasswordLowercase
    }
    // Password => must have at least 1 lowercase char
    else if (!hasUppercase(password)) {
        return validationErrors.missingPasswordUppercase
    }
    // Password => must have at least 1 digit
    else if (!hasDigit(password)) {
        return validationErrors.missingPasswordDigit
    }

    return ''
}

function hasUppercase(passwd) {
    return passwd.toLowerCase() !== passwd
}

function hasLowercase(passwd) {
    return passwd.toUpperCase() !== passwd
}

function hasDigit(passwd) {
    return String(passwd).match(/\d/)
}

// Function taken from https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
const hashPassword = async (password) => {
    const encoder = new TextEncoder()
    const encodedPassword = encoder.encode(password)

    const hashedPassword = await crypto.subtle.digest(
        'SHA-256',
        encodedPassword
    )

    const hashArray = Array.from(new Uint8Array(hashedPassword))
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
    return hashHex
}

export async function action({ request }) {
    const formData = await request.formData()
    const data = {
        name: formData.get('lastName'),
        email: formData.get('email'),
        surname: formData.get('firstName'),
        login: formData.get('username'),
        password: formData.get('password'),
        dateOfBirth: '2000-01-01',
    }
    let error = checkPassword(data.password)

    if (error === '') {
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

const SignupForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formResult = useActionData()
    const [date, setDate] = React.useState('')

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
                },
            })
            navigate('/onboarding/validation')
        }
    }, [formResult])

    return (
        <Form method="post">
            <Grid container item id="onboarding_sign_up">
                <Grid
                    item
                    xs={12}
                    className="centered_container onboarding_title center_align"
                >
                    <h1>MatChat</h1>
                </Grid>
                <Grid
                    item
                    xs={12}
                    className="centered_container catch_phrase center_align"
                >
                    <h3>Create your account to find your catmate</h3>
                </Grid>
                <Grid
                    container
                    item
                    xs={12}
                    className="centered_container input_container"
                >
                    <Grid item xs={12} className="centered_container">
                        <FormInput
                            placeholder="First Name"
                            name="firstName"
                            required={true}
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    item
                    xs={12}
                    className="centered_container input_container"
                >
                    <Grid item xs={12} className="centered_container">
                        <FormInput
                            placeholder="Last Name"
                            name="lastName"
                            required={true}
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    item
                    xs={12}
                    className="centered_container input_container"
                >
                    <Grid item xs={12} className="centered_container">
                        <FormInput
                            placeholder="Username"
                            name="username"
                            required={true}
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    item
                    xs={12}
                    className="centered_container input_container"
                >
                    <Grid item xs={12} className="centered_container">
                        <FormInput
                            placeholder="Email"
                            type="email"
                            name="email"
                            required={true}
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    item
                    xs={12}
                    className="centered_container input_container"
                >
                    <Grid item xs={12} className="centered_container">
                        <FormInput
                            placeholder="Password"
                            type="password"
                            name="password"
                            required={true}
                        />
                    </Grid>
                    {formResult &&
                        formResult.error !==
                            validationErrors.noValidationError && (
                            <Grid item xs={12} className="centered_container">
                                <label className="errorLabel">
                                    {formResult.error}
                                </label>
                            </Grid>
                        )}
                </Grid>
                <Grid
                    item
                    xs={12}
                    className="centered_container input_container"
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date of birth"
                            value={date}
                            onChange={(newDate) => {
                                setDate(newDate)
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid
                    container
                    item
                    xs={12}
                    className="centered_container button_container"
                >
                    <MainButton
                        text="Create my account"
                        shadowClass="sub"
                        submit="true"
                    ></MainButton>
                </Grid>
            </Grid>
        </Form>
    )
}

export default SignupForm
