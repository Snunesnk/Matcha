import React, { useState } from "react";
import { Grid } from "@mui/material";
import { useStoreContext } from "../../Reducer/StoreContext";
import Title from '../Title/Title'
import Button from "../Button/Button";
import './Navbar.css';

const Navbar = ({ navbarClass }) => {
    const { state, dispatch } = useStoreContext();

    return (
        <Grid container id='navbar' className={navbarClass}>
            <Grid item xs={4} className="center"></Grid>
            <Grid item xs={4} className="center">
                <Title></Title>
            </Grid>
            <Grid item xs={4} className={state.landingClass} id="loggingBtnContainer">
                <Button btnClass="log_in" text="Log in"></Button>
                <Button btnClass="sign_up" text="Sign up"></Button>
            </Grid>
        </Grid>
    )
}

export default Navbar