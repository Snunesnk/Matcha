import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ImageUpload from '../ImageUpload'
import Select from '../Select/Select'
import TagsAutocomplete from '../TagsAutocomplete/TagsAutocomplete'
import './Settings.css'
import ApiService from '../../Services/api.service'
import { CircularProgress } from '@mui/material'
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvent,
    useMap,
} from 'react-leaflet'

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
        if (typeof pictures[i] === 'string') {
            await ApiService.fetchImage(pictures[i]).then((blob) => {
                const name = pictures[i].substring(
                    pictures[i].lastIndexOf('-') + 1
                )
                const file = new File([blob], name, {
                    type: 'image/jpeg',
                })
                picturesToUplaod.push(file)
            })
        } else if (
            typeof pictures[i] === 'object' &&
            pictures[i].type.startsWith('image')
        ) {
            picturesToUplaod.push(pictures[i])
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

const saveUserInfos = async (userData) => {
    return ApiService.put('/user', { user: userData })
}

function LocationMarker({ position, setPosition }) {
    const map = useMapEvent({
        click(e) {
            setPosition(e.latlng)
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    const map2 = useMap()

    return position === null ? null : (
        <Marker position={position}>
            <Popup>
                You clicked at:
                <br />
                Latitude: {position.lat.toFixed(3)},<br />
                Longitude: {position.lng.toFixed(3)}
            </Popup>
        </Marker>
    )
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
    const [location, setLocation] = useState(null)

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
            setLocation({ lat: user.latitude, lng: user.longitude })

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
            name: firstName,
            surname: lastName,
            email: email,
            preferences: {
                prefFemale: user.prefFemale,
                prefMale: user.prefMale,
                prefEnby: user.prefEnby,
            },
            coordinate: { y: location.lat, x: location.lng },
        }
        saveUserInfos(userData, setUser)
            .then((user) => {
                setUser(user)
                setPersonalBtnDisabled(false)
                alert('Settings saved !')
            })
            .catch((err) => {
                console.log(err)
                alert('An error occured.')
                setPersonalBtnDisabled(false)
            })
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

                <div className="setting complex-setting personal-setting map">
                    <div className="setting-infos">Your location</div>
                    <MapContainer
                        center={[user.latitude, user.longitude]}
                        zoom={13}
                        // scrollWheelZoom={false}
                    >
                        <TileLayer
                            lat={user.latitude}
                            lng={user.longitude}
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker
                            position={location}
                            setPosition={setLocation}
                        />
                    </MapContainer>
                </div>

                <button
                    className="btn mrg-top-30 sm"
                    onClick={savePersonalInfos}
                    disabled={personalBtnDisabled}
                >
                    {personalBtnDisabled ? (
                        <CircularProgress />
                    ) : (
                        'Save informations'
                    )}
                </button>
            </div>
        </div>
    )
}

export default UserSettings
