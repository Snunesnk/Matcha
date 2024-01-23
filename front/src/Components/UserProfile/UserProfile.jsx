import React, { useRef, useState } from 'react'
import { ArrowDropUp, ArrowLeft, ArrowRight, Clear, Place, 
    Favorite, FavoriteBorder, Block, ReportOff,
    Star, StarBorder, StarHalf} from '@mui/icons-material'
import './UserProfile.css'

const UserProfile = ({ user, scroll = 0 }) => {
    const [selectedPicture, setSelectedPicture] = useState(-1)
    const profileRef = useRef(null)
    const infosRef = useRef(null)
    const imgs = []
    const userAge = new Date().getFullYear() - new Date(user.dateOfBirth).getFullYear()

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
        <div id="user-profile-container" className={selectedPicture !== -1 ? 'no-overflow' : ''}>
            <div className="card_img_container"
                style={{ background: 'url('
                    + (user.imgA?.includes('http') ? '' : 'http://localhost:8080/api') 
                    + user.imgA + ') 50% 50% / cover no-repeat',}}
            >
                <div className="name_and_age_container">
                    
                    <div className='icons-bar'>
                        <button className="info-chip" onClick={toggleScroll}>
                            {scroll <= 50 ? 'Info' : <ArrowDropUp />}
                        </button>

                        <Star/><StarHalf/><StarBorder/>
                        
                        <Block/><FavoriteBorder/>
                    </div>

                    <div ref={profileRef} className="name_and_age">
                        {user.surname} {user.name}, {userAge}
                        <i id="user-login"> @{user.login}</i>
                    </div>
                    <div ref={infosRef} className="user-location-infos">
                        <Place /> 19km away
                    </div>
                </div>
            </div>

            <div id="user-profile-bio">{user.bio}</div>

            <div id="user-profile-pictures-container">
                {imgs.map((img, i) => (
                    <div className="user-profile-picture"
                        key={i}
                        style={{background:'url(' + (!img || img.includes('http') ? '' : 'http://localhost:8080/api') + img + ') center',}}
                        onClick={() => setSelectedPicture(i)}>
                    </div>
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
            <div id="display-user-picture"
                className={ 'card_img_container' + (selectedPicture === -1 ? ' hidden' : '')}
                style={{ background: 'url(' +
                    (selectedPicture >= imgs.length ||
                    selectedPicture == -1 ||
                    imgs[selectedPicture].indexOf('http') > -1
                        ? ''
                        : 'http://localhost:8080/api') +
                    imgs[selectedPicture] +
                    ') 50% 50% / cover no-repeat',}}>
                <div id="picture-navigation">
                    <div className="user-picture-nav user-picture-prev" onClick={prevPicture}>
                        <ArrowLeft />
                    </div>
                    {imgs.map((img, i) => (
                        <div className={ 'img-indicator' + (selectedPicture === i ? ' img-selected' : '')}
                            key={i}
                            onClick={() => { setSelectedPicture(i)}}>
                        </div>
                    ))}
                    <div className="user-picture-nav user-picture-next" onClick={nextPicture}>
                        <ArrowRight />
                    </div>
                </div>
                <button id="btn-close-magnify-picture" onClick={() => setSelectedPicture(-1)}>
                    <Clear />
                </button>
            </div>
        </div>
    )
}

export default UserProfile
