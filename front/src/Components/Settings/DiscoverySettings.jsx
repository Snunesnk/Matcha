import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../Button/Button'
import DualRangeSlider from '../DualRangeSlider/DualRangeSlider'
import RangeSlider from '../RangeSlider/RangeSlider'
import Select from '../Select/Select'
import TagsAutocomplete from '../TagsAutocomplete/TagsAutocomplete'
import './Settings.css'

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

const DiscoverySettings = () => {
    const login = useSelector((state) => state.userState.userInfos.login)
    const [user, setUser] = useState(null)
    const [maxDistance, setMaxDistance] = useState(DIST_MAX)
    const [ageMin, setAgeMin] = useState(AGE_MIN)
    const [ageMax, setAgeMax] = useState(AGE_MAX)
    const [fameMin, setFameMin] = useState(FAME_MIN)
    const [fameMax, setFameMax] = useState(FAME_MAX)
    const [discoveryGender, setDiscoveryGender] = useState('Female')
    const [searchTags, setSearchTags] = useState([])

    useEffect(() => {
        getUserSettings(login, setUser)
    }, [])


    return (
        <div id="user-settings">
            <div id="settings-container">
                <h2>Discovery settings</h2>
                <div className="setting">
                    <div>Show me</div>
                    <Select
                        options={GENDERS.map((gender) => gender.name)}
                        defaultSelected={discoveryGender}
                        onChange={(e) => setDiscoveryGender(e.target.value)}
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
                    <TagsAutocomplete value={searchTags} setValue={(e, tagsList) => setSearchTags(tagsList)}/>
                </div>
                <div className="setting complex-setting">
                    <div className="setting-infos">
                        <div>Popularity range</div>
                        <div>{fameMin}%-{fameMax}%</div>
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
                <Button text={'Save discovery settings'} btnClass={'grey mrg-top-30'}/>

            </div>
        </div>
    )
}

export default DiscoverySettings
