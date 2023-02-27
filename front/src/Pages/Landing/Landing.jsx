import React from 'react'
import { Grid } from '@mui/material'
import MainButton from '../../Components/MainButton/MainBtn'
import { Link } from 'react-router-dom'
import './Landing.css'

const LandingPage = () => {
    return (
        <div id="landing_page">
            <div id="background_landing_img"></div>
            <div id="landing_catch_phrase_container">
                <h1 id="landing_catch_phrase">
                    Ready to meet fluffy cats in you area ?
                </h1>
            </div>
            <Link to="/onboarding/signup">
                <MainButton text="Find your new catmate"></MainButton>
            </Link>
            {/* <Grid
                container
                id="landing_container"
                direction="column"
                justifyContent="center"
            >
                <Grid item>
                    <div className="grid_item"></div>
                </Grid>
                <Grid item></Grid>
            </Grid> */}
        </div>
    )
}

export default LandingPage
