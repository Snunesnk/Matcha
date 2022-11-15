import React from "react";
import { Routes, Route } from "react-router-dom";
import { Grid } from "@mui/material";
import Title from '../Title/Title'
import Button from "../Button/Button";
import './Navbar.css';

const LogInBtn = () => {
    return (
        <Grid item xs={4} id="loggingBtnContainer">
            <Button btnClass="log_in" text="Log in"></Button>
        </Grid>
    )
}

const Navbar = () => {
    return (
        <Grid container id='navbar'>
            <Grid item xs={4} className="center"></Grid>
            <Grid item xs={4} className="center">
                <Title></Title>
            </Grid>

            <Routes>
                <Route path="" element={<LogInBtn />} />
            </Routes>

        </Grid>
    )
}

export default Navbar