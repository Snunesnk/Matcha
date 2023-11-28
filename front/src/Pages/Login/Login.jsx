import { useState } from 'react'
import Button from '../../Components/Button/Button'
import FormInput from '../../Components/FormInput/FormInput'
import './Login.css'

const LoginPage = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div id="login_page">
            <div id="login-container">
                <div id="login-welcome">
                    <h2>Log into your account</h2>
                    <p>Welcome back! Please enter your details.</p>
                </div>
                <div className="login-input">
                    <label htmlFor="login">Login</label>
                    <FormInput
                        placeholder="Login"
                        name="login"
                        required={true}
                        updateValue={setLogin}
                    />
                </div>

                <div className="login-input">
                    <label htmlFor="password">Password</label>
                    <FormInput
                        placeholder="Password"
                        name="password"
                        required={true}
                        updateValue={setPassword}
                    />
                </div>
                <div id="login-forgot-password">
                    <label>Forgot password?</label>
                </div>
                <Button text="Sign in" btnClass="pink" />
            </div>
        </div>
    )
}

export default LoginPage
