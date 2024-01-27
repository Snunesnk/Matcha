import FormInput from '../../Components/FormInput/FormInput'
import './Login.css'
import { Form, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { USER_STATE_ACTIONS } from '../../constants'
import { hashPassword } from '../../utils'
import { CircularProgress } from '@mui/material'
import ApiService from '../../Services/api.service'

// TODO: Handle back status code response
const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [formdata, setFormData] = useState({
        login: '',
        password: '',
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const data = { ...formdata }
        data.password = await hashPassword(data.password)

        ApiService.post('/user/login', data)
            .then((res) => {
                setLoading(false)
                dispatch({
                    type: USER_STATE_ACTIONS.LOG_IN,
                    payload: {
                        email: res.email,
                        name: res.name,
                        login: res.login,
                        imgA: res.imgA,
                    },
                })
                if (res.message === 'EMAIL_NOT_VERIFIED')
                    navigate('/validation')
                else navigate('/dashboard')
            })
            .catch((err) => {
                setLoading(false)

                switch (err.status) {
                    case 400:
                        setError('Please fill in all the fields')
                        break
                    case 401:
                        setError('Please verify your email')
                        break
                    case 404:
                        setError('Login or password incorrect')
                        break
                    default:
                        setError('Something went wrong ... Please try again')
                        break
                }
            })
    }

    return (
        <div id="test-div">
            <div id="left-div" className="left-login">
                <div></div>
            </div>
            <div id="right-div">
                <Form id="onboarding_form" onSubmit={handleSubmit}>
                    <h3 id="signup_title">
                        Welcome back! Please enter your credentials.
                    </h3>
                    <div>
                        <FormInput
                            placeholder="Login or email"
                            name="login"
                            value={formdata.login}
                            updateValue={(value) => {
                                setFormData({
                                    ...formdata,
                                    login: value,
                                })
                            }}
                        />
                    </div>
                    <div id="login-password">
                        <FormInput
                            placeholder="Password"
                            name="password"
                            type="password"
                            value={formdata.password}
                            updateValue={(value) =>
                                setFormData({
                                    ...formdata,
                                    password: value,
                                })
                            }
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

                    <button
                        className="btn signup-btn"
                        type="submit"
                        onClick={() => setLoading(true)}
                    >
                        {loading ? <CircularProgress /> : 'Sign In'}
                    </button>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage
