import { useState } from 'react'
import FormInput from '../../Components/FormInput/FormInput'
import './ResetPassword.css'
import SendMail from './Components/SendMail'
import ChangePassword from './Components/ChangePassword'

// I need to check is there's a token.
// If so => I need to display the form to change a password
// If not => I need to display mail input

const ResetPasswordPage = () => {
    const searchParams = new URLSearchParams(window.location.search)
    const token = searchParams.get('token')
    const login = searchParams.get('login')

    return (
        <div id="password-reset-container">
            {token ? <ChangePassword login={login} /> : <SendMail />}
        </div>
    )
}
export default ResetPasswordPage
