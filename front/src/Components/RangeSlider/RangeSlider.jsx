import { useState, useEffect } from 'react'
import './RangeSlider.css'

const RangeSlider = ({ min, max, defaultValue, onChange }) => {
    const [value, setValue] = useState(defaultValue)
    const [distRatio, setDistRatio] = useState(
        ((defaultValue - min) * 100) / (max - min)
    )

    const updateDistRatio = (e) => {
        const newRatio = ((e.target.value - min) * 100) / (max - min)

        setDistRatio(newRatio)
    }

    const getBackgroundSize = () => {
        return {
            backgroundSize: `${distRatio}% 100%`,
        }
    }

    useEffect(() => {
        onChange({ value: value })
    }, [value, onChange])

    return (
        <input
            className="slider"
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => {
                setValue(e.target.value)
                updateDistRatio(e)
            }}
            style={getBackgroundSize()}
        />
    )
}

export default RangeSlider
