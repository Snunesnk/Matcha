import { useNavigate, useRouteError } from 'react-router-dom'
import './index.css'
import { useEffect } from 'react'

export default function ErrorPage() {
    const error = useRouteError()
    const navigate = useNavigate()
    console.error(error)

    useEffect(() => {
        if (error.status === 401) {
            navigate('/login')
        }
    }, [])

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>A cat must have unplugged the cable ...</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
}
