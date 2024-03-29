import { useState, useRef, useCallback, useEffect } from 'react'
import './DualRangeSlider.css'

const DualRangeSlider = ({ min, max, defaultValue, onChange }) => {
    const [minVal, setMinVal] = useState(defaultValue.min)
    const [maxVal, setMaxVal] = useState(defaultValue.max)
    const minValRef = useRef(null)
    const maxValRef = useRef(null)
    const range = useRef(null)

    // Convert to percentage
    const getPercent = useCallback(
        (value) => ((value - min) / (max - min)) * 100,
        [min, max]
    )

    // Set width of the range to decrease from the left side
    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal)
            const maxPercent = getPercent(+maxValRef.current.value)

            if (range.current) {
                range.current.style.left = `${minPercent}%`
                range.current.style.width = `${maxPercent - minPercent}%`
            }
        }
    }, [minVal, getPercent])

    // Set width of the range to decrease from the right side
    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value)
            const maxPercent = getPercent(maxVal)

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`
            }
        }
    }, [maxVal, getPercent])

    // Get min and max values when their state changes
    useEffect(() => {
        onChange({ min: minVal, max: maxVal })
    }, [minVal, maxVal, onChange])

    return (
        <div className="dual-range">
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                ref={minValRef}
                onChange={(event) => {
                    const value = Math.min(+event.target.value, maxVal - 1)
                    setMinVal(value)
                    event.target.value = value.toString()
                }}
                className={
                    'thumb thumb--zindex-3' +
                    (minVal > max - 100 ? ' thumb--zindex-5' : '')
                }
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                ref={maxValRef}
                onChange={(event) => {
                    const value = Math.max(+event.target.value, minVal + 1)
                    setMaxVal(value)
                    event.target.value = value.toString()
                }}
                className="thumb thumb--zindex-4"
            />

            <div className="slider">
                <div className="slider__track" />
                <div ref={range} className="slider__range" />
            </div>
        </div>
    )
}

export default DualRangeSlider
