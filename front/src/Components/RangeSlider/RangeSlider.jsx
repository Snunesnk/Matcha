import { useState, useEffect } from 'react'
import './RangeSlider.css'

const RangeSlider = ({ min, max, onChange }) => {
    const [value, setValue] = useState(max)
    const [distRatio, setDistRatio] = useState(100)

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
