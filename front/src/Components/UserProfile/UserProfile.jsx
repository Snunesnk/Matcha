import React, { useEffect, useRef, useState } from 'react'
import PlaceIcon from '@mui/icons-material/Place'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import ClearIcon from '@mui/icons-material/Clear'
import './UserProfile.css'
import socket from '../../Socket/socket'
import { useDispatch } from 'react-redux'
import { USER_STATE_ACTIONS } from '../../constants'
import { formatTimeDifference } from '../MessagesLeftPane/MessagesLeftPane'

const updateOnlineStatus = (status, actualUser, setCurrentOnline) => {
    if (actualUser?.login === status.login) {
        setCurrentOnline(status)
    }
}

function calculateAge(birthdate) {
    var today = new Date()
    var birthDate = new Date(birthdate)
    var age = today.getFullYear() - birthDate.getFullYear()
    var m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    return age
}

const UserProfile = ({ user, scroll = 0 }) => {
    const [selectedPicture, setSelectedPicture] = useState(-1)
    const [currentOnline, setCurrentOnline] = useState(false)
    const profileRef = useRef(null)
    const infosRef = useRef(null)
    const dispatch = useDispatch()
    const imgs = []
    const userAge = calculateAge(user.dateOfBirth)

    if (user.imgA) imgs.push(user.imgA)
    if (user.imgB) imgs.push(user.imgB)
    if (user.imgC) imgs.push(user.imgC)
    if (user.imgD) imgs.push(user.imgD)
    if (user.imgE) imgs.push(user.imgE)

    useEffect(() => {
        const handleOnlineStatus = (status) => {
            updateOnlineStatus(status, user, setCurrentOnline)
        }
        socket.on('online-status', handleOnlineStatus)

        setCurrentOnline(false)
        if (user) {
            dispatch({
                type: USER_STATE_ACTIONS.CHECK_ONLINE_STATUS,
                payload: {
                    login: user.login,
                },
            })
        }

        return () => {
            socket.off('online-status', handleOnlineStatus)
        }
    }, [user])

    const prevPicture = () => {
        if (selectedPicture === 0) {
            setSelectedPicture(imgs.length - 1)
        } else {
            setSelectedPicture(selectedPicture - 1)
        }
    }
    const nextPicture = () => {
        if (selectedPicture === imgs.length - 1) {
            setSelectedPicture(0)
        } else {
            setSelectedPicture(selectedPicture + 1)
        }
    }

    const toggleScroll = () => {
        if (scroll <= 50) {
            profileRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        } else {
            infosRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            })
        }
    }

    return (
        <div
            id="user-profile-container"
            className={selectedPicture !== -1 ? 'no-overflow' : ''}
        >
            <div
                className="card_img_container"
                style={{
                    background:
                        'url(' +
                        (user.imgA?.includes('http')
                            ? ''
                            : 'http://localhost:8080/api') +
                        user.imgA +
                        ') 50% 50% / cover no-repeat',
                }}
            >
                <div className="name_and_age_container">
                    <div className="info-chip-container">
                        <button className="info-chip" onClick={toggleScroll}>
                            {scroll <= 50 ? 'Info' : <ArrowDropDownIcon />}
                        </button>
                    </div>
                    <div ref={profileRef} className="name_and_age">
                        {user.surname}, {userAge}
                        <div className="indicator-container">
                            <div
                                className={
                                    'indicator' +
                                    (currentOnline.online
                                        ? ' online'
                                        : ' offline')
                                }
                            ></div>
                            <p className="last-online">
                                {currentOnline.online
                                    ? 'Connected'
                                    : formatTimeDifference(
                                          currentOnline.lastOnline
                                      )}
                            </p>
                        </div>
                    </div>
                    <div className="connected-and-login"></div>
                    <div ref={infosRef} className="user-location-infos">
                        <div className="location">
                            <PlaceIcon /> {Math.floor(user.distance)}km away
                        </div>
                    </div>
                </div>
            </div>

            <div id="user-profile-infos">
                {user.surname} {user.name}, {userAge}{' '}
                <span>{user.gender.toUpperCase()}</span>
            </div>
            <div className="user-login-container">
                <i id="user-login"> @{user.login}</i>
            </div>
            <div id="user-profile-bio">
                <b>About me</b>
                {user.bio}
            </div>

            <div id="user-profile-pictures-container">
                {imgs.map((img, i) => (
                    <div
                        key={i}
                        className="user-profile-picture"
                        style={{
                            background:
                                'url(' +
                                (!img || img.includes('http')
                                    ? ''
                                    : 'http://localhost:8080/api') +
                                img +
                                ') center',
                        }}
                        onClick={() => setSelectedPicture(i)}
                    ></div>
                ))}
            </div>

            <div id="user-profile-tags">
                {user.tags &&
                    typeof user.tags === 'string' &&
                    user.tags.split(', ').map((tag, i) => (
                        <div key={i} className="user-profile-tag">
                            <i>#</i>
                            {tag}
                        </div>
                    ))}
                {user.tags &&
                    typeof user.tags === 'object' &&
                    user.tags.map((tag, i) => (
                        <div key={i} className="user-profile-tag">
                            <i>#</i>
                            {tag.bwid}
                        </div>
                    ))}
            </div>
            <div
                id="display-user-picture"
                className={
                    'card_img_container' +
                    (selectedPicture === -1 ? ' hidden' : '')
                }
                style={{
                    background:
                        'url(' +
                        (selectedPicture >= imgs.length ||
                        selectedPicture == -1 ||
                        imgs[selectedPicture].indexOf('http') > -1
                            ? ''
                            : 'http://localhost:8080/api') +
                        imgs[selectedPicture] +
                        ') 50% 50% / cover no-repeat',
                }}
            >
                <div id="picture-navigation">
                    <div
                        className="user-picture-nav user-picture-prev"
                        onClick={prevPicture}
                    >
                        <ArrowLeftIcon />
                    </div>
                    {imgs.map((img, i) => (
                        <div
                            className={
                                'img-indicator' +
                                (selectedPicture === i ? ' img-selected' : '')
                            }
                            key={i}
                            onClick={() => {
                                setSelectedPicture(i)
                            }}
                        ></div>
                    ))}
                    <div
                        className="user-picture-nav user-picture-next"
                        onClick={nextPicture}
                    >
                        <ArrowRightIcon />
                    </div>
                </div>
                <button
                    id="btn-close-magnify-picture"
                    onClick={() => setSelectedPicture(-1)}
                >
                    <ClearIcon />
                </button>
            </div>
        </div>
    )
}

export default UserProfile
