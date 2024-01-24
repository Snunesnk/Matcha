import React, { useEffect, useState } from 'react'
import DualRangeSlider from '../DualRangeSlider/DualRangeSlider'
import RangeSlider from '../RangeSlider/RangeSlider'
import SimpleSelect, { MultiSelect } from '../Select/Select'
import TagsAutocomplete from '../TagsAutocomplete/TagsAutocomplete'
import './Settings.css'
import { CircularProgress } from '@mui/material'

const DIST_MIN = 1
const DIST_MAX = 100
const AGE_MIN = 18
const AGE_MAX = 55
const FAME_MIN = 0
const FAME_MAX = 100

const GENDERS = ['Female', 'Male', 'Non-binary']

const getUserSettings = (setUser, setLoading) => {
    setLoading(true)
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }
    fetch('http://localhost:8080/api/user-settings', options)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else if (response.status === 401) {
                window.location.href = '/'
            } else throw new Error('Something went wrong ...')
        })
        .then((data) => {
            setUser(data)
            setLoading(false)
        })
        .catch((error) => {
            console.log(error)
        })
}

const savePreferences = (
    userPreferences,
    maxDistance,
    ageMin,
    ageMax,
    searchTags,
    fameMin,
    fameMax,
    setLoading
) => {
    setLoading(true)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            userPreferences,
            distMax: maxDistance,
            ageMin,
            ageMax,
            tags: searchTags,
            fameMin,
            fameMax,
        }),
    }
    fetch('http://localhost:8080/api/user-settings', options)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else if (response.status === 401) {
                window.location.href = '/'
            } else throw new Error('Something went wrong ...')
        })
        .then((data) => {
            setLoading(false)
            alert('Discovery settings saved')
        })
        .catch((error) => {
            console.log(error)
        })
}

const savePreferences = (
    userPreferences,
    maxDistance,
    ageMin,
    ageMax,
    searchTags,
    fameMin,
    fameMax,
    setLoading
) => {
    setLoading(true)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            userPreferences,
            distMax: maxDistance,
            ageMin,
            ageMax,
            tags: searchTags,
            fameMin,
            fameMax,
        }),
    }
    fetch('http://localhost:8080/api/user-settings', options)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else if (response.status === 401) {
                window.location.href = '/'
            } else throw new Error('Something went wrong ...')
        })
        .then((data) => {
            setLoading(false)
            alert('Discovery settings saved')
        })
        .catch((error) => {
            console.log(error)
        })
}

const DiscoverySettings = () => {
    const [user, setUser] = useState(null)
    const [maxDistance, setMaxDistance] = useState(DIST_MAX)
    const [ageMin, setAgeMin] = useState(AGE_MIN)
    const [ageMax, setAgeMax] = useState(AGE_MAX)
    const [fameMin, setFameMin] = useState(FAME_MIN)
    const [fameMax, setFameMax] = useState(FAME_MAX)
    const [searchTags, setSearchTags] = useState([])
    const [userPreferences, setUserPreferences] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getUserSettings(setUser, setLoading)
    }, [])

    useEffect(() => {
        if (!user) return

        const userPref = [...GENDERS]
        if (!user.prefMale) userPref.splice(userPref.indexOf('Male'), 1)
        if (!user.prefFemale) userPref.splice(userPref.indexOf('Female'), 1)
        if (!user.prefNonBinary)
            userPref.splice(userPref.indexOf('Non-binary'), 1)
        setUserPreferences(userPref)
        setMaxDistance(user.distMax)
        setAgeMin(user.ageMin)
        setAgeMax(user.ageMax)
        setFameMin(user.fameMin)
        setFameMax(user.fameMax)
        setSearchTags(user.tags)
    }, [user])

    const handlePreferenceChange = (option) => {
        if (userPreferences.includes(option)) {
            setUserPreferences((userPref) =>
                userPref.filter((opt) => opt !== option)
            )
        } else {
            if (userPreferences.length < 3) {
                setUserPreferences([...userPreferences, option])
            } else {
                alert('You can select up to 3 options')
            }
        }
    }

    return (
        <div id="user-settings">
            {user ? (
                <div id="settings-container">
                    <h2>Discovery settings</h2>

                    <div className="setting multi-select-setting">
                        <div>Show me</div>
                        <MultiSelect
                            options={GENDERS.map((gender) => gender)}
                            defaultSelected={userPreferences}
                            onChange={handlePreferenceChange}
                        />
                    </div>
                    <div className="setting complex-setting">
                        <div className="setting-infos">
                            <div>Maximum distance</div>
                            <div>{maxDistance} km</div>
                        </div>
                        <RangeSlider
                            min={DIST_MIN}
                            max={DIST_MAX}
                            defaultValue={user.distMax}
                            onChange={({ value }) => {
                                setMaxDistance(value)
                            }}
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
                            defaultValue={{
                                min: user.ageMin,
                                max: user.ageMax,
                            }}
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
                            defaultValue={{
                                min: user.fameMin,
                                max: user.fameMax,
                            }}
                            onChange={({ min, max }) => {
                                setFameMin(min)
                                setFameMax(max)
                            }}
                        />
                    </div>
                    <button
                        className="btn grey mrg-top-30"
                        onClick={() => {
                            savePreferences(
                                userPreferences,
                                maxDistance,
                                ageMin,
                                ageMax,
                                searchTags,
                                fameMin,
                                fameMax,
                                setLoading
                            )
                        }}
                        disabled={loading}
                    >
                        Save discovery settings
                    </button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default DiscoverySettings
