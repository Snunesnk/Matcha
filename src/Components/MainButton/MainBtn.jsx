import React from "react";

import './MainBtn.css';

const MainButton = ({ text, click, shadowClass = "" }) => {

    return (
        <div className="grid_item">
            <button id="main_button" onClick={click}>
                <span>{text}</span>
            </button>
            <button disabled id="shadow" className={shadowClass}>
                <span>{text}</span>
            </button>
        </div>
    )
}

export default MainButton;