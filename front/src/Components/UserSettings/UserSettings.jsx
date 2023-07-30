import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { USER_STATE_ACTIONS } from '../../constants'
import { useNavigate } from 'react-router-dom'
import Button from '../Button/Button'
import DualRangeSlider from '../DualRangeSlider/DualRangeSlider'
import ImageUpload from '../ImageUpload'
import RangeSlider from '../RangeSlider/RangeSlider'
import Select from '../Select/Select'
import TagsAutocomplete from '../TagsAutocomplete/TagsAutocomplete'
import './UserSettings.css'

const DIST_MIN = 1
const DIST_MAX = 100
const AGE_MIN = 18
const AGE_MAX = 55
const FAME_MIN = 0
const FAME_MAX = 100

const GENDERS = [
    {
        name: 'Female',
        key: 'f',
    },
    {
        name: 'Male',
        key: 'm',
    },
    {
        name: 'Non-binary',
        key: 'nb',
    },
]

const getUserSettings = (login, setUser) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    fetch('http://localhost:8080/api/user/' + login, options)
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('Something went wrong ...')
        })
        .then((data) => {
            setUser(data)
        })
        .catch((error) => {
            console.log(error)
        })
}

const saveUserImages = async (login, pictures) => {
    if (!pictures) return

    // I need to convert url pictures to file pictures to be able to same them
    for (let i = 0; i < pictures.length; i++) {
        if (typeof pictures[i] === 'string') {
            await fetch('http://localhost:8080/api' + pictures[i])
                .then((res) => res.blob())
                .then((blob) => {
                    const name = pictures[i].substring(
                        pictures[i].lastIndexOf('-') + 1
                    )
                    const file = new File([blob], name, {
                        type: 'image/jpeg',
                    })
                    pictures[i] = file
                })
        }
    }

    const formData = new FormData()

    if (pictures.length > 0) formData.append('imgA', pictures[0])
    if (pictures.length > 1) formData.append('imgB', pictures[1])
    if (pictures.length > 2) formData.append('imgC', pictures[2])
    if (pictures.length > 3) formData.append('imgD', pictures[3])
    if (pictures.length > 4) formData.append('imgE', pictures[4])

    const options = {
        method: 'PUT',
        body: formData,
    }

    await fetch('http://localhost:8080/api/user/' + login, options)
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('Something went wrong ...')
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            console.log(error)
        })
}

const saveUserInfos = (login, userData, setUser) => {
    userData.tags = userData.tags.map((tag) => {
        return { bwid: tag }
    })

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userData }),
    }
    fetch('http://localhost:8080/api/user/' + login, options)
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('Something went wrong ...')
        })
        .then((user) => {
            setUser(user)
        })
        .catch((error) => {
            console.log(error)
        })
}

const UserSettings = () => {
    const login = useSelector((state) => state.userState.userInfos.login)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [maxDistance, setMaxDistance] = useState(DIST_MAX)
    const [ageMin, setAgeMin] = useState(AGE_MIN)
    const [ageMax, setAgeMax] = useState(AGE_MAX)
    const [fameMin, setFameMin] = useState(FAME_MIN)
    const [fameMax, setFameMax] = useState(FAME_MAX)
    const [discoveryGender, setDiscoveryGender] = useState('Female')
    const [searchTags, setSearchTags] = useState([])

    const [personalGender, setPersonalGender] = useState('')
    const [personalBio, setPersonalBio] = useState('')
    const [personalTags, setPersonalTags] = useState([])
    const [personalPictures, setPersonalPictures] = useState([])
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [personalBtnDisabled, setPersonalBtnDisabled] = useState(true)

    useEffect(() => {
        getUserSettings(login, setUser)
    }, [])

    useEffect(() => {
        if (user) {
            setPersonalGender(
                GENDERS.find((gender) => gender.key === user.gender)?.name
            )
            setPersonalBio(user.bio)
            setPersonalTags(user.tags ? user.tags.map((tag) => tag.bwid) : [])
            const pictures = []
            if (user.imgA) pictures.push(user.imgA)
            if (user.imgB) pictures.push(user.imgB)
            if (user.imgC) pictures.push(user.imgC)
            if (user.imgD) pictures.push(user.imgD)
            if (user.imgE) pictures.push(user.imgE)
            setPersonalPictures(pictures)
            setLastName(user.name)
            setFirstName(user.surname)
            setEmail(user.email)

            setPersonalBtnDisabled(false)
        }
    }, [user])

    const savePersonalInfos = async () => {
        setPersonalBtnDisabled(true)
        await saveUserImages(login, personalPictures)

        const userData = {
            gender: GENDERS.find((gender) => gender.name === personalGender)
                ?.key,
            bio: personalBio,
            tags: personalTags,
            name: lastName,
            surname: firstName,
        }
        saveUserInfos(login, userData, setUser)
    }

    const logOut = () => {
        dispatch({ type: USER_STATE_ACTIONS.LOG_OUT })
        navigate('/')
    }

    if (!user) return <div>Loading ... Please wait</div>
    return (
        <div id="user-settings">
            <div id="settings-container">
                <Button text={'Log out'} btnClass="danger" onClick={logOut} />
                <div className="settings-divider"></div>
                <h2>Discovery settings</h2>
                <div className="setting">
                    <div>Show me</div>
                    <Select
                        options={GENDERS.map((gender) => gender.name)}
                        defaultSelected={discoveryGender}
                        onChange={(e) => setDiscoveryGender(e.target.value)}
                    ></Select>
                </div>
                <div className="setting complex-setting">
                    <div className="setting-infos">
                        <div>Maximum distance</div>
                        <div>{maxDistance} km</div>
                    </div>
                    <RangeSlider
                        min={DIST_MIN}
                        max={DIST_MAX}
                        onChange={({ value }) => setMaxDistance(value)}
                    />
                </div>
                <div className="setting complex-setting">
                    <div className="setting-infos">
                        <div>Age range</div>
                        <div>
                            {ageMin}-{ageMax}
                            {+ageMax === AGE_MAX ? '+' : ''}
                        </div>
                    </div>
                    <DualRangeSlider
                        min={AGE_MIN}
                        max={AGE_MAX}
                        onChange={({ min, max }) => {
                            setAgeMin(min)
                            setAgeMax(max)
                        }}
                    />
                </div>
                <div className="setting complex-setting">
                    <div className="setting-infos">Interests</div>
                    <TagsAutocomplete
                        value={searchTags}
                        setValue={(e, tagsList) => setSearchTags(tagsList)}
                    />
                </div>
                <div className="setting complex-setting">
                    <div className="setting-infos">
                        <div>Popularity range</div>
                        <div>
                            {fameMin}%-{fameMax}%
                        </div>
                    </div>
                    <DualRangeSlider
                        min={FAME_MIN}
                        max={FAME_MAX}
                        onChange={({ min, max }) => {
                            setFameMin(min)
                            setFameMax(max)
                        }}
                    />
                </div>
                <Button
                    text={'Save discovery settings'}
                    btnClass={'grey mrg-top-30'}
                />
                <div className="settings-divider"></div>

                <h2>Personal infos</h2>
                <div className="setting">
                    <div>You identify yourself as</div>
                    <Select
                        options={GENDERS.map((gender) => gender.name)}
                        defaultSelected={personalGender}
                        onChange={(e) => setPersonalGender(e.target.value)}
                    ></Select>
                </div>
                <div className="setting complex-setting">
                    <div className="setting-infos">Your biography</div>
                    <textarea
                        className="setting-biography"
                        value={personalBio}
                        onChange={(e) => setPersonalBio(e.target.value)}
                    ></textarea>
                </div>
                <div className="setting complex-setting personal-setting">
                    <div className="setting-infos">You are interested in</div>
                    <TagsAutocomplete
                        value={personalTags}
                        setValue={(e, tagsList) => setPersonalTags(tagsList)}
                    />
                </div>
                <ImageUpload
                    defaultImages={personalPictures}
                    setFileList={setPersonalPictures}
                />
                <div className="setting">
                    <div>Last name</div>
                    <input
                        className="setting-input"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="setting">
                    <div>First name</div>
                    <input
                        className="setting-input"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="setting">
                    <div>Email adress</div>
                    <input
                        className="setting-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <Button
                    text={'Save personal infos'}
                    btnClass={'grey mrg-top-30'}
                    onClick={savePersonalInfos}
                    disabled={personalBtnDisabled}
                />
                <div className="settings-divider"></div>
            </div>
        </div>
    )
}

export default UserSettings
