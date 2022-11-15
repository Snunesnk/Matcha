import "./FormInput.css"

const FormInput = ({
    placeholder,
    type = "",
    value = "",
    defaultValue = "",
    updateValue = () => { },
    name = "",
    required = false,
    // At least 1 chat is expected
    pattern = ".{1,}"
}) => {

    const onChangeUpdate = e => {
        updateValue(e.target.value);
    }

    /// Can't have an input with both value and defaultValue, so create two separate input depending of given parameters
    if (value === "") {
        return (
            <input
                className="form_input"
                placeholder={placeholder}
                type={type}
                defaultValue={defaultValue}
                onChange={onChangeUpdate}
                name={name}
                required={required}
                pattern={pattern}
            ></input>
        )
    }

    return (
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
    )
}

export default FormInput