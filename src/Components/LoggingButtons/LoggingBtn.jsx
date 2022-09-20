import React from "react";
import './LoggingBtn.css';

export default LogginButton => {
    return (
        <div id='logging_btn_container'>
            <button id='log_in' className="loggingBtn">Log In</button>
            <button id='sign_in' className="loggingBtn">Sign Up</button>
        </div>
    )
}