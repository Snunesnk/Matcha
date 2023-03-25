import React, { useEffect, useRef, useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import './index.css'
import { Favorite } from '@mui/icons-material'
import UserProfile from '../UserProfile/UserProfile'

const USER_LIST = [
    {
        firstname: 'John',
        surname: 'Doe',
        gender: 'f',
        dateOfBirth: '2000-01-10',
        email: 'john.doe@test.com',
        login: 'john.doe',
        bio: 'A happy go lucky girl with a sharp tongue and wise eyes.',
        imgA: '/src/assets/cat_profile.jpg',
        imgB: 'https://picsum.photos/200/300?random=2',
        imgC: 'https://picsum.photos/200/300?random=3',
        imgD: 'https://picsum.photos/200/300?random=4',
        imgE: 'https://picsum.photos/200/300?random=5',
        tags: [
            { bwid: 'pizza' },
            { bwid: 'workout' },
            { bwid: 'video games' },
            { bwid: 'hiking' },
        ],
    },
    {
        firstname: 'Roger',
        surname: 'Doe',
        gender: 'm',
        dateOfBirth: '1998-01-10',
        email: 'roger.doe@test.com',
        login: 'roger.doe',
        bio: 'Yes I am a Girou.',
        imgA: '/src/assets/cat_glasses.jpg',
        imgB: 'https://picsum.photos/200/300?random=2',
        imgC: 'https://picsum.photos/200/300?random=3',
        imgD: 'https://picsum.photos/200/300?random=4',
        imgE: 'https://picsum.photos/200/300?random=5',
        tags: [
            { bwid: 'pizza' },
            { bwid: 'workout' },
            { bwid: 'video games' },
            { bwid: 'hiking' },
            { bwid: 'beer' },
            { bwid: 'football' },
            { bwid: 'les copaings' },
        ],
    },
    {
        firstname: 'Marcel',
        surname: 'Doe',
        gender: 'm',
        dateOfBirth: '1998-01-10',
        email: 'roger.doe@test.com',
        login: 'roger.doe',
        bio: 'Yes I am a Girou.',
        imgA: '/src/assets/kissing_cats.jpg',
        imgB: 'https://picsum.photos/200/300?random=2',
        imgC: 'https://picsum.photos/200/300?random=3',
        imgD: 'https://picsum.photos/200/300?random=4',
        imgE: 'https://picsum.photos/200/300?random=5',
        tags: [
            { bwid: 'pizza' },
            { bwid: 'workout' },
            { bwid: 'video games' },
            { bwid: 'hiking' },
            { bwid: 'beer' },
            { bwid: 'football' },
            { bwid: 'les copaings' },
        ],
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
    const [scroll, setScroll] = useState(0)
    const [userList, setUserList] = useState(USER_LIST)
    const [actualUser, setActualUser] = useState(USER_LIST[0])
    const [nextUser, setNextUser] = useState(USER_LIST[1])
    const profileRef = useRef(null)

    const setCardState = (state) => {
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
                    setUserList((prev) => {
                        if (prev.length <= 2) prev = prev.concat(USER_LIST)
                        return prev.slice(1)
                    })
                }, 200)
            }, 200)
        }, firstTimeout)
    }

    useEffect(() => {
        setActualUser(userList[0])
        setTimeout(() => setNextUser(userList[1]), 500)
    }, [userList])

    if (userList.length > 0) {
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
            <div>
                "We're sorry, we can't find anymore corresponding profiles"
            </div>
        )
}

export default ProfileMatching
