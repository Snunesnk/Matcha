import React from "react";
import './Navbar.css';
import Title from '../Title/Title'
import LoggingBtn from "../LoggingButtons/LoggingBtn";

export default Navbar => {
    return (
        <div id='navbar'>
            <Title></Title>
            <LoggingBtn></LoggingBtn>
        </div>
    )
}