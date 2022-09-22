import "./FormInput.css"

const FormInput = ({ placeholder, type = "", value = "", updateValue = () => { } }) => {
    const onChangeUpdate = e => {
        updateValue(e.target.value);
    }

    return (
        <input className="form_input" placeholder={placeholder} type={type} value={value} onChange={onChangeUpdate}></input>
    )
}

export default FormInput