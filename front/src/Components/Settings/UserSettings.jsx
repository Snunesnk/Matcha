import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../Button/Button'
import ImageUpload from '../ImageUpload'
import Select, { MultiSelect } from '../Select/Select'
import TagsAutocomplete from '../TagsAutocomplete/TagsAutocomplete'
import './Settings.css'

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
    const [user, setUser] = useState(null)
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

    if (!user) return <div>Loading ... Please wait</div>
    return (
        <div id="user-settings">
            <div id="settings-container">
                <h2>Personal infos</h2>
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

                <Button
                    text={'Save personal infos'}
                    btnClass={'grey mrg-top-30'}
                    onClick={savePersonalInfos}
                    disabled={personalBtnDisabled}
                />
            </div>
        </div>
    )
}

export default UserSettings
