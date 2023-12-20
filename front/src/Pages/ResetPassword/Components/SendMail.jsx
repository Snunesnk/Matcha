import { useEffect, useState } from 'react'
import FormInput from '../../../Components/FormInput/FormInput'

const SendMail = () => {
    const [emailSent, setEmailSent] = useState(false)
    const [email, setEmail] = useState('')
    const [emailList, setEmailList] = useState([])

    const handleChange = (e) => {
        setEmail(e)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setEmailSent(true)
        setEmailList([...emailList, email])

        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }

        fetch('http://localhost:8080/api/user/reset-password/' + email, options)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
            })
    }

    useEffect(() => {
        const res = emailList.find((e) => e === email)
        if (res) setEmailSent(true)
        else setEmailSent(false)
    }, [email])

    return (
        <div>
            <p>
                Please enter your email address. You will receive an email with
                a unique link to reset your password .
            </p>
            <FormInput
                placeholder="Email"
                name=""
                required={true}
                updateValue={handleChange}
            />
            <button
                className="btn signup-btn"
                type="submit"
                onClick={handleSubmit}
                disabled={emailSent}
            >
                Send an email to reset your password
            </button>
            <p className="send-mail-label">{emailSent && 'Email sent'}</p>
        </div>
    )
}

export default SendMail
