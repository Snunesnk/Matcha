import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useStoreContext } from "../../Reducer/StoreContext";
import { PossibleState } from "../../constants";
import Title from '../Title/Title'
import LoggingBtn from "../LoggingButtons/LoggingBtn";
import './Navbar.css';

export default Navbar => {
    const [className, setClass] = useState("");
    const { state, dispatch } = useStoreContext();

    useEffect(() => {
        if (state === PossibleState.onboarding)
            setClass("onboarded");
        else
            setClass("");
    }, [state])

    return (
        <Grid container id='navbar'>
            <Grid item xs={4} className="center"></Grid>
            <Grid item xs={4} className="center">
                <Title></Title>
            </Grid>
            <Grid item xs={4} className={className} id="loggingBtnContainer">
                <LoggingBtn></LoggingBtn>
            </Grid>
        </Grid>
    )
}