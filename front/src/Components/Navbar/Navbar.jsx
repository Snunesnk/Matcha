import React from "react";
import { Grid } from "@mui/material";
import Title from '../Title/Title'
import Button from "../Button/Button";
import './Navbar.css';

const Navbar = () => {
    return (
        <Grid container id='navbar'>
            <Grid item xs={4} className="center"></Grid>
            <Grid item xs={4} className="center">
                <Title></Title>
            </Grid>
            <Grid item xs={4} id="loggingBtnContainer">
                <Button btnClass="log_in" text="Log in"></Button>
                <Button btnClass="sign_up" text="Sign up"></Button>
            </Grid>
        </Grid>
    )
}

export default Navbar