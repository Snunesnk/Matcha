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
    const [evaluation, setEvaluation] = useState('')
    const [actualCard, setactualCard] = useState({
        url: '/src/assets/cat_profile.jpg',
        name: 'Jon the cat',
        age: '7',
    })
    const [scroll, setScroll] = useState(0)

    let transitioning = false

    const displayNextCard = () => {
        console.log(actualCard)
        setactualCard(profileCards.shift())

        transitioning = false
        setCardState('')
    }

    const setCardLiked = () => {
        setEvaluation('liked')
        setTimeout(() => setEvaluation((prev) => prev + ' transition'), 200)
        // if (!transitioning) setTimeout(displayNextCard, 500)
        setTimeout(() => setEvaluation(''), 500)
    }

    const setCardDisiked = () => {
        setEvaluation('disliked')
        setTimeout(() => setEvaluation((prev) => prev + ' transition'), 200)
        // if (!transitioning) setTimeout(displayNextCard, 500)
        setTimeout(() => setEvaluation(''), 500)
    }

    if (actualCard) {
        return (
            <div id="profile_matching">
                <div
                    id="profile_matching-container"
                    className={evaluation}
                    onScroll={(e) => setScroll(e.target.scrollTop)}
                >
                    <UserProfile scroll={scroll} />

                    <div className="profile-evaluation">
                        <p id="profile-disliked">Nope</p>
                        <p id="profile-liked">Like</p>
                    </div>

                    <div
                        className="card_img_container next-user"
                        style={{
                            background:
                                'url(' +
                                // DUMMY_USER.imgA +
                                '/src/assets/cat_glasses.jpg' +
                                ') 50% 50% / cover no-repeat',
                        }}
                    ></div>
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
