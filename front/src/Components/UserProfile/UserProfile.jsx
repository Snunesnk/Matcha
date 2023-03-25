import React, { useRef, useState } from 'react'
import PlaceIcon from '@mui/icons-material/Place'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import './UserProfile.css'

const UserProfile = ({ user, scroll = 0 }) => {
    const [selectedPicture, setSelectedPicture] = useState(-1)
    const emailRef = useRef(null)
    const infosRef = useRef(null)
    const imgs = []
    const userAge =
        new Date().getFullYear() - new Date(user.dateOfBirth).getFullYear()

    if (user.imgA) imgs.push(user.imgA)
    if (user.imgB) imgs.push(user.imgB)
    if (user.imgC) imgs.push(user.imgC)
    if (user.imgD) imgs.push(user.imgD)
    if (user.imgE) imgs.push(user.imgE)

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
            emailRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            })
        } else {
            infosRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            })
        }
    }

    return (
        <div id="user-profile-container">
            <div
                className="card_img_container"
                style={{
                    background:
                        'url(' + user.imgA + ') 50% 50% / cover no-repeat',
                }}
            >
                <div className="name_and_age_container">
                    <button className="info-chip" onClick={toggleScroll}>
                        {scroll <= 50 ? 'Info' : <ArrowDropDownIcon />}
                    </button>
                    <div className="name_and_age">
                        {user.firstname}, {userAge}
                    </div>
                    <div ref={infosRef} className="user-location-infos">
                        <PlaceIcon /> 19km away
                    </div>
                </div>
            </div>

            <div id="user-profile-bio">{user.bio}</div>

            <i id="user-login">@{user.login}</i>
            <i ref={emailRef} id="user-email">
                {user.email}
            </i>

            <div id="user-profile-pictures-container">
                {imgs.map((img, i) => (
                    <div
                        key={i}
                        className="user-profile-picture"
                        style={{ background: 'url(' + img + ') center' }}
                        onClick={() => setSelectedPicture(i)}
                    ></div>
                ))}
            </div>

            <div id="user-profile-tags">
                {user.tags.map((tag, i) => (
                    <div key={i} className="user-profile-tag">
                        <i>#</i>
                        {tag.bwid}
                    </div>
                ))}
            </div>
            <div
                id="display-user-picture"
                className={
                    selectedPicture !== -1 ? 'mignify-picture' : 'hidden'
                }
            >
                <div id="user-pictures-navigator">
                    <div
                        className="user-picture-nav user-picture-prev"
                        onClick={prevPicture}
                    >
                        {'<'}
                    </div>
                    <img src={imgs[selectedPicture]}></img>
                    <div
                        className="user-picture-nav user-picture-prev"
                        onClick={nextPicture}
                    >
                        {'>'}
                    </div>
                </div>
                <button
                    id="btn-close-magnify-picture"
                    onClick={() => setSelectedPicture(-1)}
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default UserProfile
