import { useState } from 'react'
import Button from '../../Components/Button/Button'
import FormInput from '../../Components/FormInput/FormInput'
import './Login.css'
import { Form, useActionData } from 'react-router-dom'

// const LoginPage = () => {
//     const [login, setLogin] = useState('')
//     const [password, setPassword] = useState('')

//     return (
//         <div id="login_page">
//             <div id="login-container">
//                 <div id="login-welcome">
//                     <h2>Log in to your account</h2>
//                     <p>Welcome back! Please enter your details.</p>
//                 </div>
//                 <div className="login-input">
//                     <label htmlFor="login">Login</label>
//                     <FormInput
//                         placeholder="Login"
//                         name="login"
//                         required={true}
//                         updateValue={setLogin}
//                     />
//                 </div>

//                 <div className="login-input">
//                     <label htmlFor="password">Password</label>
//                     <FormInput
//                         placeholder="Password"
//                         name="password"
//                         required={true}
//                         updateValue={setPassword}
//                     />
//                 </div>
//                 <div id="login-forgot-password">
//                     <label>Forgot password?</label>
//                 </div>
//                 <Button text="Sign in" btnClass="pink" />
//             </div>
//         </div>
//     )
// }

const LoginPage = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const formResult = useActionData()

    return (
        <div id="test-div">
            <div id="right-div-t">
                <div></div>
            </div>
            <div id="right-div">
                <Form id="onboarding_form" method="post">
                    <div id="login-welcome">
                        <h2>Log in to your account</h2>
                        <p>Welcome back! Please enter your details.</p>
                    </div>
                    <div>
                        <FormInput
                            placeholder="Login"
                            name="login"
                            required={true}
                            updateValue={setLogin}
                        />
                    </div>
                    <div>
                        <FormInput
                            placeholder="Password"
                            name="password"
                            required={true}
                            updateValue={setPassword}
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
                    <div id="login-forgot-password">
                        <label>Forgot password?</label>
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
