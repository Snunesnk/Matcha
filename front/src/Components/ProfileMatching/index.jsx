import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ClearIcon from '@mui/icons-material/Clear'
import './index.css'
import { Favorite } from '@mui/icons-material'
import UserProfile from '../UserProfile/UserProfile'
import Button from '../Button/Button'

const getUserLocation = async () => {
    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
            },
            (err) => {
                resolve({
                    lat: null,
                    lng: null,
                })
            }
        )
    })
}

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

const getProfileList = (setUserList, matchingParameters) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(matchingParameters),
    }
    fetch('http://localhost:8080/api/matching-profiles', options)
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('Something went wrong ...')
        })
        .then((data) => {
            setUserList(data.results)
        })
        .catch((error) => {
            console.log(error)
        })
}

const sendLike = async (receiver) => {
    return fetch('http://localhost:8080/api/like', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ receiver }),
    })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('Something went wrong ...')
        })
        .then((data) => {
            return data
        })
        .catch((error) => {
            console.log(error)
            return false
        })
}

// I think there should be a loading animation
// Plus a last card that tells "No more user"

const ProfileMatching = () => {
    const [evaluation, setEvaluation] = useState('')
    const [scroll, setScroll] = useState(0)
    const [userList, setUserList] = useState([])
    const [actualUser, setActualUser] = useState(null)
    const [nextUser, setNextUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [match, setMatch] = useState(false)
    const profileRef = useRef(null)
    const naviguate = useNavigate()

    useEffect(() => {
        setLoading(true)
        const matchingParameters = {
            distMin: 0,
            distMax: 100,
            ageMin: 18,
            ageMax: 55,
            fameMin: 0,
            fameMax: 100,
            tags: [],
        }
        getProfileList(setUserList, matchingParameters)

        const getLocation = async () => {
            const loc = await getUserLocation()
            if (loc.lat !== null && loc.lng !== null) {
                setLoading(true)
                const option = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        lat: loc.lat,
                        lng: loc.lng,
                    }),
                    credentials: 'include',
                }

                fetch('http://localhost:8080/api/location', option).then(
                    (res) => {
                        if (res.ok)
                            getProfileList(setUserList, matchingParameters)
                    }
                )
            }
        }
        getLocation()
    }, [])

    const setCardState = async (state) => {
        if (state === 'liked') {
            const res = await sendLike(actualUser.login)
            if (res.match) {
                setMatch(true)
                setEvaluation('liked')
                return
            }
        }

        transition(state)
    }

    const transition = (state) => {
        let firstTimeout = 100

        // Increase timeout if we are not at the top to have time to scroll
        if (profileRef.current.scrollTop > 50) {
            profileRef.current.scrollTop = 0
            firstTimeout = 200
        }

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
                        if (prev.length <= 2) prev = prev.concat([])
                        return prev.slice(1)
                    })
                }, 200)
            }, 200)
        }, firstTimeout)
    }

    useEffect(() => {
        setActualUser(userList[0] || null)
        setTimeout(() => setNextUser(userList[1] || null), 500)
        setLoading(false)
    }, [userList])

    if (loading) return <div>Loading...</div>
    if (actualUser !== null) {
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

                    {nextUser ? (
                        <div
                            className="card_img_container next-user"
                            style={{
                                background:
                                    'url(' +
                                    (nextUser.imgA?.includes('http')
                                        ? ''
                                        : 'http://localhost:8080/api') +
                                    nextUser.imgA +
                                    ') 50% 50% / cover no-repeat',
                            }}
                        >
                            <div className="name_and_age_container"></div>
                        </div>
                    ) : (
                        <div className="card_img_container next-user">
                            <div className="name_and_age_container"></div>
                        </div>
                    )}

                    {match && (
                        <div className="match-animation">
                            <div className="match-animation-container">
                                <div className="match-animation-img-container">
                                    <img
                                        src={
                                            (actualUser.imgA?.includes('http')
                                                ? ''
                                                : 'http://localhost:8080/api') +
                                            actualUser.imgA
                                        }
                                        alt="user avatar"
                                        className="avatar"
                                    />
                                </div>
                                <div className="match-animation-text">
                                    <p>
                                        <span className="itsa-span">
                                            It's a
                                        </span>
                                        <span className="match-span">
                                            match!
                                        </span>
                                    </p>
                                </div>
                                <Button
                                    text={'Send a message'}
                                    btnClass={'pink-scale match-msg'}
                                    onClick={() => {
                                        const param = encodeURIComponent(
                                            actualUser.login
                                        )
                                        naviguate(
                                            `/dashboard/messages?user=${param}`
                                        )
                                    }}
                                />
                                <Button
                                    text={'Keep looking'}
                                    btnClass={'white-scale match-keep'}
                                    onClick={() => {
                                        setMatch(false)
                                        transition('liked')
                                    }}
                                />
                            </div>
                        </div>
                    )}

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
            // TODO: Add a "Sorry" title in big, plus a short description
            <div id="profile_matching">
                <div id="user-profile-container">
                    <div>
                        We're sorry, we can't find anymore corresponding
                        profiles. Please try again later.
                    </div>
                </div>
            </div>
        )
}

export default ProfileMatching
