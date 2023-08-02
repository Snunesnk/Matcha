import './Select.css'

const Select = ({ options, defaultSelected, onChange }) => {
    return (
        <select className="select" onChange={onChange} value={defaultSelected}>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}

export default Select
