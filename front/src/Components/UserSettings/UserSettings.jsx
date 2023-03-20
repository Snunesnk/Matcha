import { style } from '@mui/system'
import React, { useState } from 'react'
import './UserSettings.css'

const DIST_MIN = 1
const DIST_MAX = 100

const UserSettings = () => {
    const [maxDistance, setMaxDistance] = useState(50)
    const [distRatio, setDistRatio] = useState(0.5)
    const [ageRange, setAgeRange] = useState(18)
    const [ageRatio, setageRatio] = useState(0.5)

    const updateDistRatio = (e) => {
        const newRatio =
            ((e.target.value - DIST_MIN) * 100) / (DIST_MAX - DIST_MIN)

        setDistRatio(newRatio)
    }

    return (
        <div id="user-settings">
            <h1>Discovery settings</h1>
            <div className="setting">
                <div>Show me</div>
                <button>Female {'>'}</button>
            </div>
            <div className="setting range-setting">
                <div>
                    <div>Maximum distance</div>
                    <div>{maxDistance} km</div>
                </div>
                <input
                    className="slider"
                    type="range"
                    min={DIST_MIN}
                    max={DIST_MAX}
                    value={maxDistance}
                    onChange={(e) => {
                        setMaxDistance(e.target.value)
                        updateDistRatio(e)
                    }}
                    style={{ backgroundSize: { distRatio } + '% 100%' }}
                />
            </div>
            <div className="setting range-setting">
                <div>
                    <div>Age range</div>
                    <div>18-99</div>
                </div>
                <input
                    className="slider"
                    type="range"
                    min="1"
                    max="100"
                    value={ageRange}
                    onChange={(e) => setAgeRange(e.target.value)}
                />
            </div>
            <div className="setting">Interests</div>
            <div className="setting">Popularity</div>
            <h1>User settings</h1>
            <div className="setting">Gender</div>
            <div className="setting">Biography</div>
            <div className="setting">Interests</div>
            <div className="setting">Pictures</div>
            <div className="setting">Last name</div>
            <div className="setting">First name</div>
            <div className="setting">Email adress</div>
        </div>
    )
}

export default UserSettings
