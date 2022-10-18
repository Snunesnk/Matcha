import React from "react";
import { Grid } from "@mui/material";
import MainButton from "../../Components/MainButton/MainBtn";
import { useStoreContext } from "../../Reducer/StoreContext";
import { PossibleState } from "../../constants";
import './Landing.css';

const LandingPage = ({ landingClass }) => {
    const { state, dispatch } = useStoreContext();

    const goToOnboarding = () => {
        dispatch({ type: PossibleState.onboarding });
    }

    return (
        <div id="landing_page" className={landingClass}>
            <Grid container id="landing_container" direction="column" justifyContent="center">
                <Grid item >
                    <div className="grid_item">
                        <h1 id="landing_catch_phrase">Meet fluffy cats in you area</h1>
                    </div>
                </Grid>
                <Grid item >
                    <MainButton text="Find your new catmate" click={goToOnboarding}></MainButton>
                </Grid>
            </Grid>
        </div >
    )
}

export default LandingPage;