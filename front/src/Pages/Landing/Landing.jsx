import React from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'

const LandingPage = () => {
    return (
        <div id="landing_page">
            <div id="background_landing_img"></div>
            <div id="landing_main_btn_container">
                <h1 id="landing_catch_phrase">
                    Ready to meet fluffy cats in you area ?
                </h1>
                <div>
                    <Link to="/onboarding/signup">
                        <button id="landing_main_button">
                            Find your new catmate
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
