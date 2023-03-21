import { Autocomplete, Chip, TextField } from '@mui/material'
import { style } from '@mui/system'
import React, { useEffect, useState } from 'react'
import Button from '../Button/Button'
import DualRangeSlider from '../DualRangeSlider/DualRangeSlider'
import RangeSlider from '../RangeSlider/RangeSlider'
import TagsAutocomplete from '../TagsAutocomplete/TagsAutocomplete'
import './UserSettings.css'

const DIST_MIN = 1
const DIST_MAX = 100
const AGE_MIN = 18
const AGE_MAX = 55
const FAME_MIN = 0
const FAME_MAX = 100

const pictures = [
    'https://picsum.photos/200/300?random=1',
    'https://picsum.photos/200/300?random=2',
    'https://picsum.photos/200/300?random=3',
    'https://picsum.photos/200/300?random=4',
    'https://picsum.photos/200/300?random=5',
]

const UserSettings = () => {
    const [maxDistance, setMaxDistance] = useState(DIST_MAX)
    const [ageMin, setAgeMin] = useState(AGE_MIN)
    const [ageMax, setAgeMax] = useState(AGE_MAX)
    const [fameMin, setFameMin] = useState(FAME_MIN)
    const [fameMax, setFameMax] = useState(FAME_MAX)
    const [tags, setTags] = useState(['test'])

    return (
        <div id="user-settings">
            <div id="settings-container">
                <div className="settings-divider"></div>
                <h2>Discovery settings</h2>
                <div className="setting">
                    <div>Show me</div>
                    <button>Female {'>'}</button>
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
                        onChange={(e, tagsList) => setTags(tagsList)}
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
                    <div>You indentify yourself as a</div>
                    <button>Female {'>'}</button>
                </div>
                <div className="setting complex-setting">
                    <div className="setting-infos">Your biography</div>
                    <textarea className="setting-biography"></textarea>
                </div>
                <div className="setting complex-setting personal-setting">
                    <div className="setting-infos">You are interested in</div>
                    <TagsAutocomplete
                        onChange={(e, tagsList) => setTags(tagsList)}
                    />
                </div>
                <div className="setting complex-setting">
                    <div className="setting-infos">
                        <div>Your pictures</div>
                        <div>
                            <button>Upload</button>
                        </div>
                    </div>
                    <div id="user-settings-pictures-container">
                        {pictures.map((src, i) => (
                            <div className="setting-picture-container" key={i}>
                                <div
                                    className="user-setting-picture"
                                    style={{
                                        background: 'url(' + src + ') center',
                                    }}
                                    // onClick={() => setSelectedPicture(i)}
                                ></div>
                                <div className="setting-picture-delete">
                                    <button className="setting-picture-delete-btn">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="setting">
                    <div>Last name</div>
                    <input className="setting-input" />
                </div>
                <div className="setting">
                    <div>First name</div>
                    <input className="setting-input" />
                </div>
                <div className="setting">
                    <div>Email adress</div>
                    <input className="setting-input" />
                </div>
                <Button
                    text={'Save personal infos'}
                    btnClass={'grey mrg-top-30'}
                />
                <div className="settings-divider"></div>
            </div>
        </div>
    )
}

export default UserSettings
