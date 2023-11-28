import FormInput from '../../Components/FormInput/FormInput'
import './Login.css'
import { Form, useActionData, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

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
        login: formData.get('login'),
        password: formData.get('password'),
    }

    data.password = await hashPassword(data.password)

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    const res = await fetch(
        'http://localhost:8080/api/user/login',
        options
    ).then((response) => {
        return response.json()
    })

    return res
}

const LoginPage = () => {
    const formResult = useActionData()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState('')

    useEffect(() => {
        if (!formResult) return

        console.log(formResult)

        switch (formResult.message) {
            case 'EMAIL_NOT_VERIFIED':
                navigate('/onboarding/validation')
                break
            case 'MISSING_DATA':
                setError('Missing data')
                break
            case 'WRONG_CREDENTIALS':
                setError('Login or password incorrect')
                break
            case 'COULD_NOT_LOGIN':
                setError('Could not login')
                break
            case 'LOG_IN_SUCCESS':
                dispatch({
                    type: USER_STATE_ACTIONS.LOG_IN,
                    payload: {
                        email: formResult.email,
                        name: formResult.name,
                        login: formResult.login,
                    },
                })
                navigate('/dashboard')
                break
            default:
                console.log('Unknown message')
        }
    }, [formResult])

    return (
        <div id="test-div">
            <div id="right-div-t">
                <div></div>
            </div>
            <div id="right-div">
                <Form id="onboarding_form" method="post">
                    <h3 id="signup_title">
                        Welcome back! Please enter your credentials.
                    </h3>
                    <div>
                        <FormInput
                            placeholder="Login"
                            name="login"
                            required={true}
                        />
                    </div>
                    <div id="login-password">
                        <FormInput
                            placeholder="Password"
                            name="password"
                            type="password"
                            required={true}
                        />
                        <div id="login-error">{error}</div>
                    </div>
                    <div id="login-forgot-password">
                        <label>Forgot your password?</label>
                    </div>
                    <button className="btn signup-btn" type="submit">
                        Sign In
                    </button>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage
