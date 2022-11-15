import React from "react";
import './Title.css'
import { Link } from "react-router-dom";

export default Title => {
    return (
        <Link id='title_container' to="/">
            <h1>MatChat</h1>
        </Link>
    )
}