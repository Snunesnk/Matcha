import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useStoreContext } from "../../Reducer/StoreContext";
import { PossibleState } from "../../constants";
import Title from '../Title/Title'
import Button from "../Button/Button";
import './Navbar.css';

export default Navbar => {
    const [className, setClass] = useState("");
    const { state, dispatch } = useStoreContext();

    return (
        <Grid container id='navbar'>
            <Grid item xs={4} className="center"></Grid>
            <Grid item xs={4} className="center">
                <Title></Title>
            </Grid>
            <Grid item xs={4} className={className} id="loggingBtnContainer">
                <div id="log_in_sign_up" className={state.landingClass}>
                    <Button btnClass="log_in" text="Log in"></Button>
                    <Button btnClass="sign_up" text="Sign up"></Button>
                </div>
                <div id="already_have_account" className={state.onBoardingClass}>
                    <p id="alreadyHaveLabel">Already have an account?</p>
                    <Button btnClass={"alreadyHaveAccount " + state.onBoardingClass} text="Log in"></Button>
                </div>
            </Grid>
        </Grid>
    )
}