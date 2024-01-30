import './FormInput.css'

const FormInput = ({
    placeholder,
    type = '',
    value = '',
    defaultValue = '',
    updateValue = () => {},
    name = '',
    required = false,
    // At least 1 chat is expected
    pattern = '.{1,}',
}) => {
    const onChangeUpdate = (e) => {
        updateValue(e.target.value)
    }

    /// Can't have an input with both value and defaultValue, so create two separate input depending of given parameters
    if (value === '') {
        return (
            <div className="form_input_container">
                <input
                    className="form_input"
                    placeholder={placeholder}
                    type={type}
                    defaultValue={defaultValue}
                    onChange={onChangeUpdate}
                    name={name}
                    required={required}
                    pattern={pattern}
                    autoComplete="on"
                ></input>
            </div>
        )
    }

    return (
        <div className="form_input_container">
            <label className="form_label">{placeholder}</label>
            <input
                className="form_input"
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChangeUpdate}
                name={name}
                required={required}
                pattern={pattern}
            ></input>
        </div>
    )
}

export default FormInput
