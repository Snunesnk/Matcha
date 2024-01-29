import { useEffect, useState } from 'react'
import FormInput from '../../../Components/FormInput/FormInput'
import ApiService from '../../../Services/api.service'

// TODO: Handle back status code response
const SendMail = () => {
    const [emailSent, setEmailSent] = useState(false)
    const [email, setEmail] = useState('')
    const [emailList, setEmailList] = useState([])
    const [alreadySent, setAlreadySent] = useState(false)

    const handleChange = (e) => {
        setEmail(e)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setEmailList([...emailList, email])

        ApiService.get('/user/reset-password/' + email)
            .then((data) => {
                console.log(data)
                setEmailSent(true)
            })
            .catch((error) => {
                console.log(error)
                setAlreadySent(true)
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
            <p className="send-mail-label">{alreadySent && 'Email already sent'}</p>

        </div>
    )
}

export default SendMail
