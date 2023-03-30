import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { USER_STATE_ACTIONS } from '../../constants'
import './OnboardingForm.css'

const uploadUserImages = (login, userData) => {
    const formData = new FormData()

    if (userData.pictures.imgA) formData.append('imgA', userData.pictures.imgA)
    if (userData.pictures.imgB) formData.append('imgB', userData.pictures.imgB)
    if (userData.pictures.imgC) formData.append('imgC', userData.pictures.imgC)
    if (userData.pictures.imgD) formData.append('imgD', userData.pictures.imgD)
    if (userData.pictures.imgE) formData.append('imgE', userData.pictures.imgE)

    const options = {
        method: 'PUT',
        body: formData,
    }
    fetch('http://localhost:8080/api/user/' + login, options)
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('Something went wrong ...')
        })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
}

const uploadUserDatas = (login, userData) => {
    // Add mandatory "bwid" field name for tags
    userData.tags = userData.tags.map((tag) => {
        return { bwid: tag }
    })

    // Remove pictures from user data, as it is already uploaded
    userData.pictures = null

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userData }),
    }
    fetch('http://localhost:8080/api/user/' + login, options).then(
        (response) => {
            console.log(response)
        }
    )
}

const AllSetMessage = () => {
    const dispatch = useDispatch()
    const userState = useSelector((state) => state.userState)
    const login = userState.userInfos.login
    const userData = userState.userSettings

    const sendForm = () => {
        dispatch({ type: USER_STATE_ACTIONS.ONBOARDED })

        // First, upload images, as it requires different header
        uploadUserImages(login, userData)
        // Then, upload user datas
        uploadUserDatas(login, userData)
    }

    return (
        <div id="gender_selection_container">
            <p id="gender_selection_catch_phrase">
                <b>Fantastic, you're all set :)</b>
            </p>
            <p>Are you ready to find your catmate?</p>

            <div>
                <Link to="/dashboard">
                    <button id="onboarding_next_button" onClick={sendForm}>
                        Let the magic begin!
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default AllSetMessage
