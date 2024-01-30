import React, { useEffect, useRef, useState } from 'react'
import {
    ArrowDropUp,
    ArrowLeft,
    ArrowRight,
    Clear,
    Place,
    Star,
    StarBorder,
    StarHalf,
    Female,
    Male,
    Transgender,
} from '@mui/icons-material'
import './UserProfile.css'
import socket from '../../Socket/socket'
import { useDispatch } from 'react-redux'
import { USER_STATE_ACTIONS } from '../../constants'
import { formatTimeDifference } from '../MessagesLeftPane/MessagesLeftPane'
import ReportPopup from '../ReportPopUp/ReportPopUp'
import ApiService from '../../Services/api.service'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'

const updateOnlineStatus = (status, actualUser, setCurrentOnline) => {
    if (actualUser?.login === status.login) {
        setCurrentOnline(status)
    }
}

const StarRating = ({ percentage }) => {
    const ratingOutOfThree = (percentage / 100) * 3
    const fullStars = Math.floor(ratingOutOfThree)
    const halfStar = ratingOutOfThree % 1 >= 0.5 ? 1 : 0
    const emptyStars = 3 - fullStars - halfStar

    const fullStarsElements = Array(fullStars).fill(<Star />)
    const halfStarElement = halfStar ? true : false
    const emptyStarsElements = Array(emptyStars).fill(<StarBorder />)

    return (
        <div>
            {fullStarsElements.map((star, i) => (
                <Star key={i} />
            ))}
            {halfStarElement && <StarHalf />}
            {emptyStarsElements.map((star, i) => (
                <StarBorder key={i} />
            ))}
        </div>
    )
}

const GenderIcon = ({ gender }) => {
    switch (gender.toLowerCase()) {
        case 'f':
            return <Female fontSize="large" />
        case 'm':
            return <Male fontSize="large" />
        default:
            return <Transgender fontSize="large" />
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

const UserProfile = ({
    user,
    scroll = 0,
    unlikable = false,
    isMe = false,
    setUnlike = () => {},
    transition = () => {},
}) => {
    const [selectedPicture, setSelectedPicture] = useState(-1)
    const [currentOnline, setCurrentOnline] = useState(false)
    const [userLiked, setUserLiked] = useState(false)
    const [location, setLocation] = useState(null)

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
        if (!user) return
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

        setLocation({ lat: user.latitude, lng: user.longitude })
        if (user.userLiked) setUserLiked(user.userLiked === 'true')

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
                        ApiService.getImgPath(user.imgA) +
                        ') 50% 50% / cover no-repeat',
                }}
            >
                {userLiked && (
                    <div id="user-profile-has-liked">
                        <img src="./heart.svg" alt="heart" />
                    </div>
                )}

                <div className="name_and_age_container">
                    <div id="btn-row">
                        <button className="info-chip" onClick={toggleScroll}>
                            {scroll <= 50 ? 'Info +' : <ArrowDropUp />}
                        </button>

                        {unlikable && (
                            <button
                                id="unlike-btn"
                                onClick={() =>
                                    ApiService.delete(`/like/${user.login}`)
                                        .then(() => {
                                            setUnlike(user.login)
                                        })
                                        .catch((error) => {
                                            console.log(error)
                                        })
                                }
                            >
                                Unlike
                            </button>
                        )}
                    </div>

                    <div className="main-info">
                        <div ref={profileRef} className="name_and_age">
                            {user.name}, {userAge}{' '}
                            <GenderIcon gender={user.gender} />
                        </div>
                        <StarRating percentage={user.rating} />
                    </div>

                    <div ref={infosRef} className="user-location-infos">
                        <div className="location">
                            <Place /> {Math.floor(user.distance)}km away
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
                    </div>
                </div>
            </div>

            <div id="user-profile-infos">
                <div>
                    {user.name} {user.surname}
                    <i id="user-login">@{user.login}</i>
                </div>
                {!isMe && (
                    <ReportPopup
                        user={user}
                        transition={transition}
                        setUnlike={setUnlike}
                    />
                )}
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
                                (!img ? '' : ApiService.getImgPath(img)) +
                                ') center',
                        }}
                        onClick={() => setSelectedPicture(i)}
                    ></div>
                ))}
            </div>

            {location && (
                <div className="map-container">
                    <MapContainer
                        center={[location.lat, location.lng]}
                        zoom={13}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            lat={location.lat}
                            lng={location.lng}
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={location}></Marker>
                    </MapContainer>
                </div>
            )}

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
                        (selectedPicture >= imgs.length || selectedPicture == -1
                            ? ''
                            : ApiService.getImgPath(imgs[selectedPicture])) +
                        ') 50% 50% / cover no-repeat',
                }}
            >
                <div id="picture-navigation">
                    <div
                        className="user-picture-nav user-picture-prev"
                        onClick={prevPicture}
                    >
                        <ArrowLeft />
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
                        <ArrowRight />
                    </div>
                </div>
                <button
                    id="btn-close-magnify-picture"
                    onClick={() => setSelectedPicture(-1)}
                >
                    <Clear />
                </button>
            </div>
        </div>
    )
}

export default UserProfile
