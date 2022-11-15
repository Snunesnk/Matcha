import React from "react";

import './MainBtn.css';

const MainButton = ({ text, click = () => { }, shadowClass = "", submit = "false" }) => {

    return (
        <div className="grid_item">
            <button id="main_button" onClick={click} submit={submit}>
                <span>{text}</span>
            </button>
            <button disabled id="shadow" className={shadowClass}>
                <span>{text}</span>
            </button>
        </div>
    )
}

export default MainButton;