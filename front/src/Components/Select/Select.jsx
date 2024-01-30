import { useState } from 'react'
import './Select.css'

const SimpleSelect = ({ options, defaultSelected, onChange }) => {
    return (
        <select
            className="select"
            onChange={onChange}
            value={defaultSelected}
            name="select"
        >
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}

export const MultiSelect = ({ options, defaultSelected, onChange }) => {
    return (
        <div className="multi-select">
            {options.map((option) => (
                <div
                    className={
                        'multi-select-item' +
                        (defaultSelected.includes(option) ? ' checked' : '')
                    }
                    key={option}
                    onClick={() => onChange(option)}
                >
                    <input
                        type="checkbox"
                        id={option}
                        name={option}
                        checked={defaultSelected.includes(option)}
                        onChange={() => onChange(option)}
                    />
                    <span>{option}</span>
                </div>
            ))}
        </div>
    )
}

export default SimpleSelect
