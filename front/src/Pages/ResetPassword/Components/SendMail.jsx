import { useEffect, useState } from 'react'
import FormInput from '../../../Components/FormInput/FormInput'
import ApiService from '../../../Services/api.service'

// TODO: Handle back status code response
const SendMail = () => {
    const [emailSent, setEmailSent] = useState(false)
    const [email, setEmail] = useState('')
    const [emailList, setEmailList] = useState([])
    const [error, setError] = useState(false)

    const handleChange = (e) => {
        setEmail(e)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setEmailList([...emailList, email])

        ApiService.get('/user/reset-password/' + email)
            .then((data) => {
                setEmailSent(true)
            })
            .catch((error) => {
                console.log(error)
                switch (error.response.status) {
                    case 404:
                        setError('Email not found')
                        break
                    case 401:
                        setError('Email not verified')
                        break
                    case 400:
                        setError('Email already sent')
                        break
                    default:
                        setError('An error occured')
                }
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
                name="email"
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
            <p className="send-mail-label">{error}</p>
        </div>
    )
}

export default SendMail
