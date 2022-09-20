import React from "react";
import { Grid } from "@mui/material";
import { useStoreContext } from "../../Reducer/StoreContext";
import { PossibleState } from "../../constants";
import './MainBtn.css';

export default MainButton => {
    const { state, dispatch } = useStoreContext();

    const goToOnboarding = () => {
        dispatch({ type: PossibleState.onboarding });
    }

    return (
        <Grid container id='main_btn_container'>
            <Grid item xs={12}>
                <div className="grid_item">
                    <h1>Meet fluffy cats in you area!</h1>
                </div>
            </Grid>
            <Grid item xs={12}>
                <div className="grid_item">
                    <button id="main_button" onClick={goToOnboarding}>
                        <span>Find your new catmate</span>
                    </button>
                    <button disabled id="shadow">
                        <span>Find your new catmate</span>
                    </button>
                </div>
            </Grid>
        </Grid>
    )
}