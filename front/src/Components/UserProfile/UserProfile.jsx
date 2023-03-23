import React, { useState } from 'react'
import PlaceIcon from '@mui/icons-material/Place'
import './UserProfile.css'

const DUMMY_USER = {
    firstname: 'John',
    surname: 'Doe',
    gender: 'f',
    dateOfBirth: '2000-01-10',
    email: 'john.doe@test.com',
    login: 'john.doe',
    bio: 'A happy go lucky girl with a sharp tongue and wise eyes.',
    imgA: 'https://picsum.photos/200/300?random=1',
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
}

const UserProfile = () => {
    const [selectedPicture, setSelectedPicture] = useState(-1)
    const imgs = []
    const userAge =
        new Date().getFullYear() -
        new Date(DUMMY_USER.dateOfBirth).getFullYear()

    if (DUMMY_USER.imgA) imgs.push(DUMMY_USER.imgA)
    if (DUMMY_USER.imgB) imgs.push(DUMMY_USER.imgB)
    if (DUMMY_USER.imgC) imgs.push(DUMMY_USER.imgC)
    if (DUMMY_USER.imgD) imgs.push(DUMMY_USER.imgD)
    if (DUMMY_USER.imgE) imgs.push(DUMMY_USER.imgE)

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

    return (
        <div id="user-profile-container">
            <div
                className="card_img_container"
                style={{
                    background:
                        'url(' +
                        // DUMMY_USER.imgA +
                        '/src/assets/cat_profile.jpg' +
                        ') 50% 50% / cover no-repeat',
                }}
            >
                <div className="name_and_age_container">
                    <button className="info-chip">Info</button>
                    <div className="name_and_age">
                        {DUMMY_USER.firstname}, {userAge}
                    </div>
                    <div className="user-location-infos">
                        <PlaceIcon /> 19km away
                    </div>
                </div>
            </div>

            <div id="user-profile-bio">{DUMMY_USER.bio}</div>

            <i id="user-login">@{DUMMY_USER.login}</i>
            <i id="user-email">{DUMMY_USER.email}</i>

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
                {DUMMY_USER.tags.map((tag, i) => (
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
