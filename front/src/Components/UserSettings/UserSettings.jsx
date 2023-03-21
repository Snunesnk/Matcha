import { style } from '@mui/system'
import React, { useState } from 'react'
import DualRangeSlider from '../DualRangeSlider/DualRangeSlider'
import RangeSlider from '../RangeSlider/RangeSlider'
import './UserSettings.css'

const DIST_MIN = 1
const DIST_MAX = 100
const AGE_MIN = 18
const AGE_MAX = 55
const FAME_MIN = 0
const FAME_MAX = 100

const UserSettings = () => {
    const [maxDistance, setMaxDistance] = useState(DIST_MAX)
    const [ageMin, setAgeMin] = useState(AGE_MIN)
    const [ageMax, setAgeMax] = useState(AGE_MAX)
    const [fameMin, setFameMin] = useState(FAME_MIN)
    const [fameMax, setFameMax] = useState(FAME_MAX)

    return (
        <div id="user-settings">
            <div id="settings-container">
                <div className="settings-divider"></div>
                <h3>Discovery settings</h3>
                <div className="setting">
                    <div>Show me</div>
                    <button>Female {'>'}</button>
                </div>
                <div className="setting range-setting">
                    <div>
                        <div>Maximum distance</div>
                        <div>{maxDistance} km</div>
                    </div>
                    <RangeSlider
                        min={DIST_MIN}
                        max={DIST_MAX}
                        onChange={({ value }) => setMaxDistance(value)}
                    />
                </div>
                <div className="setting range-setting">
                    <div>
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
                <div className="setting">Interests</div>
                <div className="setting range-setting">
                    <div>
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
                <div className="settings-divider"></div>
                <h3>Personal infos</h3>
                <div className="setting">My gender</div>
                <div className="setting">Who am I</div>
                <div className="setting">Topics I'm interested in</div>
                <div className="setting">My pictures</div>
                <div className="setting">Last name</div>
                <div className="setting">First name</div>
                <div className="setting">Email adress</div>
                <div className="settings-divider"></div>
            </div>
        </div>
    )
}

export default UserSettings
