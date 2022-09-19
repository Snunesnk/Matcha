import React from "react";
import { Grid } from "@mui/material";
import './MainBtn.css';

export default MainButton => {
    return (
        <Grid container id='main_btn_container'>
            <Grid item xs={12}>
                <div className="grid_item">
                    <h1>Meet fluffy cats in you area!</h1>
                </div>
            </Grid>
            <Grid item xs={12}>
                <div className="grid_item">
                    <button id="main_button">
                        <span>Find your new catmate</span>
                    </button>
                    <button disabled id="shadow">
                        <span>Find your new catmate</span>
                    </button>
                    {/* <button id="main_button_shadow">Find your new catmate</button> */}
                </div>
            </Grid>
        </Grid>
    )
}