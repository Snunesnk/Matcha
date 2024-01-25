import React from 'react'
import { useNavigate } from 'react-router-dom'
import OnboardingCard from '../OnboardingCard/OnboardingCard'
import './OnboardingForm.css'
import { useSelector } from 'react-redux'
import ApiService from '../../Services/api.service'

const AllSetMessage = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.userState.userSettings)
    const [error, setError] = React.useState(null)

    const sendForm = () => {
        const formData = new FormData()

        formData.append('imgA', user.pictures.imgA)
        formData.append('imgB', user.pictures.imgB)
        formData.append('imgC', user.pictures.imgC)
        formData.append('imgD', user.pictures.imgD)
        formData.append('imgE', user.pictures.imgE)

        ApiService.sendForm('/upload-pictures', formData)
            .then(() => {
                console.log(user)
                ApiService.put('/user', { user: user })
                    .then(() => {
                        navigate('/dashboard')
                    })
                    .catch((error) => {
                        switch (error.status) {
                            case 400:
                                setError(
                                    'Missing information. Please fill in all the fields'
                                )
                                break
                            case 404:
                                setError(
                                    'User not found. Please try to log in again'
                                )
                                break
                            default:
                                setError(
                                    'Something went wrong ... Please try again'
                                )
                                break
                        }
                        setLoading(false)
                    })
            })
            .catch((error) => {
                if (error.status === 400) {
                    setError(
                        'Missing information. Please fill in all the fields'
                    )
                } else {
                    setError('Something went wrong ... Please try again')
                }
            })
    }

    const content = (
        <div>
            <p id="gender_selection_catch_phrase">
                <b>Fantastic, you're all set :)</b>
            </p>
            <p>Are you ready to find your catmate?</p>
            {error && <p className="errorLabel">{error}</p>}
        </div>
    )

    return (
        <OnboardingCard
            header={''}
            content={content}
            next={''}
            btnText={'Let the magic begin!'}
            onClick={sendForm}
            btnClass="all-set-btn"
        />
    )
}

export default AllSetMessage
