import React, { useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import './index.css'
import { Favorite } from '@mui/icons-material'
import UserProfile from '../UserProfile/UserProfile'

let profileCards = [
    {
        url: '/src/assets/cat_profile.jpg',
        name: 'Jon the cat',
        age: '7',
    },
    {
        url: '/src/assets/cat_glasses.jpg',
        name: 'Marc the bg',
        age: '5',
    },
]

const GradientCross = () => (
    <>
        <svg width={0} height={0}>
            <linearGradient id="userColors" x1={1} y1={0} x2={1} y2={1}>
                <stop offset={0} stopColor="#4ac0fc" />
                <stop offset={1} stopColor="#dc21b8" />
            </linearGradient>
        </svg>
        <ClearIcon sx={{ fill: 'url(#userColors)' }} />
    </>
)

const ProfileMatching = () => {
    const [cardState, setCardState] = useState('')
    const [actualCard, setactualCard] = useState({
        url: '/src/assets/cat_profile.jpg',
        name: 'Jon the cat',
        age: '7',
    })

    let transitioning = false

    const displayNextCard = () => {
        console.log(actualCard)
        setactualCard(profileCards.shift())

        transitioning = false
        setCardState('')
    }

    const setCardLiked = () => {
        setCardState('liked')
        if (!transitioning) setTimeout(displayNextCard, 500)
    }

    const setCardDisiked = () => {
        setCardState('disliked')
        if (!transitioning) setTimeout(displayNextCard, 500)
    }

    if (actualCard) {
        return (
            <div id="profile_matching">
                <div id="profile_matching-container">
                    <UserProfile />
                    <div className="profile_matching_btn_container">
                        <button
                            className="profile_matching_btn profile_matching_dislike"
                            onClick={setCardDisiked}
                        >
                            <GradientCross />
                        </button>
                        <button
                            className="profile_matching_btn profile_matching_like"
                            onClick={setCardLiked}
                        >
                            <Favorite />
                        </button>
                    </div>
                </div>
            </div>
        )
    } else return "We're sorry, we can't find anymore corresponding profiles"
}

export default ProfileMatching
