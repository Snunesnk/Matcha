import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { USER_STATE_ACTIONS } from '../../constants'
import './OnboardingForm.css'
import OnboardingCard from '../OnboardingCard/OnboardingCard'

const AllSetMessage = () => {
    const dispatch = useDispatch()
    const userState = useSelector((state) => state.userState)
    const login = useSelector((state) => state.userState.userInfos.login)

    const sendForm = () => {
        dispatch({ type: USER_STATE_ACTIONS.ONBOARDED })

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: userState.userSettings }),
        }
        fetch('http://localhost:8080/api/user/' + login, options).then(
            (response) => {
                console.log(response)
            }
        )
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
            next={'/dashboard'}
            btnText={'Let the magic begin!'}
            onClick={sendForm}
            btnClass="all-set-btn"
        />
    )
}

export default AllSetMessage
