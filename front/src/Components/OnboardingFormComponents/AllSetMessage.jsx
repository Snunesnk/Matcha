import React from 'react'
import { useNavigate } from 'react-router-dom'
import OnboardingCard from '../OnboardingCard/OnboardingCard'
import './OnboardingForm.css'

const AllSetMessage = () => {
    const navigate = useNavigate()

    const sendForm = () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }
        fetch('http://localhost:8080/api/user/onboarded', options)
            .then((response) => {
                if (response.ok) {
                    console.log('User onboarded')
                    navigate('/dashboard')
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
