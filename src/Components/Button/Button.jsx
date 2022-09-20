import React from "react";
import './Button.css';

const Button = ({ text, btnClass }) => {
    return (
        <button className={btnClass + " btn"}>{text}</button>
    )
}

export default Button