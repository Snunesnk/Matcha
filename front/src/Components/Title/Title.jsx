import React from "react";
import './Title.css'
import { Link } from "react-router-dom";

const Title = () => {
    return (
        <Link id='title_container' to="/">
            <h1>MatChat</h1>
        </Link>
    )
}

export default Title;