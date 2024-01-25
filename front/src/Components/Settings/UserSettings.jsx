import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '../Button/Button'
import ImageUpload from '../ImageUpload'
import Select from '../Select/Select'
import TagsAutocomplete from '../TagsAutocomplete/TagsAutocomplete'
import './Settings.css'
import ApiService from '../../Services/api.service'

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

const getUserSettings = (setUser) => {
    ApiService.get('/user/me')
        .then((data) => {
            setUser(data.user)
        })
        .catch((error) => {
            console.log(error)
        })
}

const saveUserImages = async (login, pictures) => {
    if (!pictures) return
    const picturesToUplaod = []

    // I need to convert url pictures to file pictures to be able to savee them
    for (let i = 0; i < pictures.length; i++) {
        if (
            typeof pictures[i] === 'string' &&
            !pictures[i].startsWith('http')
        ) {
            await fetch('http://localhost:8080/api' + pictures[i])
                .then((res) => {
                    console.log(res.headers)
                    return res.blob()
                })
                .then((blob) => {
                    const name = pictures[i].substring(
                        pictures[i].lastIndexOf('-') + 1
                    )
                    const file = new File([blob], name, {
                        type: 'image/jpeg',
                    })
                    picturesToUplaod.push(file)
                })
        }
    }

    const formData = new FormData()

    if (picturesToUplaod.length > 0)
        formData.append('imgA', picturesToUplaod[0])
    if (picturesToUplaod.length > 1)
        formData.append('imgB', picturesToUplaod[1])
    if (picturesToUplaod.length > 2)
        formData.append('imgC', picturesToUplaod[2])
    if (picturesToUplaod.length > 3)
        formData.append('imgD', picturesToUplaod[3])
    if (picturesToUplaod.length > 4)
        formData.append('imgE', picturesToUplaod[4])

    if (picturesToUplaod.length > 0) {
        await ApiService.sendForm('/upload-pictures', formData).catch(
            (error) => {
                console.log(error)
            }
        )
    }
}

const saveUserInfos = (userData, setUser) => {
    console.log(userData)
    userData.tags = userData.tags.map((tag) => {
        return { bwid: tag }
    })

    ApiService.put('/user', { user: userData })
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
        getUserSettings(setUser)
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
        console.log(user)
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
        saveUserInfos(userData, setUser)
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
                    <div>You identify as</div>
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
                    btnClass={'white mrg-top-30'}
                    onClick={savePersonalInfos}
                    disabled={personalBtnDisabled}
                />
            </div>
        </div>
    )
}

export default UserSettings
