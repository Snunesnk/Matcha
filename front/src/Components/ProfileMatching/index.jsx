import React, { useEffect, useRef, useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import './index.css'
import { Favorite } from '@mui/icons-material'
import UserProfile from '../UserProfile/UserProfile'
import { useSelector } from 'react-redux'

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

const getProfileList = (setUserList) => {
    fetch('http://localhost:8080/api/user/verified', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('Something went wrong ...')
        })
        .then((data) => {
            setUserList(data)
        })
        .catch((error) => {
            console.log(error)
        })
}

const sendLike = (issuer, receiver) => {
    fetch('http://localhost:8080/api/like', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ issuer, receiver }),
    })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('Something went wrong ...')
        })
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
            console.log(error)
        })
}

const ProfileMatching = () => {
    const userLogin = useSelector((state) => state.userState.userInfos.login)
    const [evaluation, setEvaluation] = useState('')
    const [scroll, setScroll] = useState(0)
    const [userList, setUserList] = useState([])
    const [actualUser, setActualUser] = useState(null)
    const [nextUser, setNextUser] = useState(null)
    const profileRef = useRef(null)

    useEffect(() => {
        getProfileList(setUserList)
    }, [])

    const setCardState = (state) => {
        let firstTimeout = 100

        // Increase timeout if we are not at the top to have time to scroll
        if (profileRef.current.scrollTop > 50) {
            profileRef.current.scrollTop = 0
            firstTimeout = 200
        }

        if (state === 'liked') sendLike(userLogin, actualUser.login)

        // First timeout, to have time to scroll to top
        setTimeout(() => {
            setEvaluation(state)

            // Second timeout, to have time to see like/dislike animation
            setTimeout(() => {
                setEvaluation((prev) => prev + ' transition')

                // Third timeout, to have time to see transition between cards
                setTimeout(() => {
                    setEvaluation('')
                    ////////////////// NEED TO CHANGE THIS TO GET NEXT BATCH, OR DISPLAY "NO MORE USERS"
                    setUserList((prev) => {
                        if (prev.length <= 2) prev = prev.concat(USER_LIST)
                        return prev.slice(1)
                    })
                }, 200)
            }, 200)
        }, firstTimeout)
    }

    useEffect(() => {
        setActualUser(userList[0] || null)
        setTimeout(() => setNextUser(userList[1] || null), 500)
    }, [userList])

    if (actualUser !== null && nextUser !== null) {
        return (
            <div id="profile_matching">
                <div
                    id="profile_matching-container"
                    className={evaluation}
                    onScroll={(e) => setScroll(e.target.scrollTop)}
                    ref={profileRef}
                >
                    <UserProfile scroll={scroll} user={actualUser} />

                    <div className="profile-evaluation">
                        <p id="profile-disliked">Nope</p>
                        <p id="profile-liked">Like</p>
                    </div>

                    <div
                        className="card_img_container next-user"
                        style={{
                            background:
                                'url(' +
                                (nextUser.imgA.includes('http')
                                    ? ''
                                    : 'http://localhost:8080/api') +
                                nextUser.imgA +
                                ') 50% 50% / cover no-repeat',
                        }}
                    >
                        <div className="name_and_age_container"></div>
                    </div>
                    <div className="profile_matching_btn_container">
                        <button
                            className="profile_matching_btn profile_matching_dislike"
                            onClick={() => setCardState('disliked')}
                        >
                            <GradientCross />
                        </button>
                        <button
                            className="profile_matching_btn profile_matching_like"
                            onClick={() => setCardState('liked')}
                        >
                            <Favorite />
                        </button>
                    </div>
                </div>
            </div>
        )
    } else
        return (
            <div>We're sorry, we can't find anymore corresponding profiles</div>
        )
}

export default ProfileMatching
