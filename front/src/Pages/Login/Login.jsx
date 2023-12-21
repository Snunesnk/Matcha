import FormInput from '../../Components/FormInput/FormInput'
import './Login.css'
import { Form, useActionData, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { USER_STATE_ACTIONS } from '../../constants'
import { hashPassword } from '../../utils'

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

// TODO: Handle back status code response
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
            <div id="left-div" className="left-login">
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
                    {/* When the user clicks the button, it should sent him an email
                        it should also tell him that the email has been sent
                        Then there must be a link in the mail redirecting to a page where the user
                        can set a new password
                        A new token must be created for the user and used as identification
                         */}
                    <button
                        id="login-forgot-password"
                        type="button"
                        onClick={() => navigate('/password-reset')}
                    >
                        Forgot your password?
                    </button>

                    <button className="btn signup-btn" type="submit">
                        Sign In
                    </button>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage
