import React from 'react'
import { useNavigate } from 'react-router-dom'
import OnboardingCard from '../OnboardingCard/OnboardingCard'
import './OnboardingForm.css'
import { useSelector } from 'react-redux'

const AllSetMessage = () => {
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate()
    const user = useSelector((state) => state.userState.userSettings)

    const sendForm = () => {
        // First API to send image
        // If everything goes well, then second api to send user informations
        const formData = new FormData()

        formData.append('imgA', user.pictures.imgA)
        formData.append('imgB', user.pictures.imgB)
        formData.append('imgC', user.pictures.imgC)
        formData.append('imgD', user.pictures.imgD)
        formData.append('imgE', user.pictures.imgE)

        const options = {
            method: 'PUT',
            credentials: 'include',
            body: formData,
        }
        fetch('http://localhost:8080/api/user/', options)
            .then((response) => {
                if (response.ok) {
                    console.log('User onboarded')
                    // navigate('/dashboard')
                } else {
                    // User needs to fill in informations
                    throw new Error('Something went wrong ...')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const content = (
        <div>
            <p id="gender_selection_catch_phrase">
                <b>Fantastic, you're all set :)</b>
            </p>
            <p>Are you ready to find your catmate?</p>
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
