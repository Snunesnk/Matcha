import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { Grid } from '@mui/material'
import {
    AlreadyHaveAccountBtn,
    QuitOnboarding,
} from '../../Components/Button/Button'
import './Onboarding.css'
import ProgressBar from '../../Components/ProgressBar'
import { useSelector } from 'react-redux'

const Onboarding = () => {
    const loggedIn = useSelector((state) => state.userState.userStatus.loggedIn)

    return (
        <div id="onboarding">
            <Grid container id="onboarding_grid">
                <Grid item xs={0} md={6} id="cat_pic"></Grid>
                <Grid item xs={12} md={6} id="onboarding-component-container">
                    {/* Onboarding children */}
                    <Outlet />
                </Grid>
            </Grid>

            <Routes>
                <Route
                    path="welcome"
                    element={
                        <ProgressBar percentage="0" prev="" next="gender" />
                    }
                />
                <Route
                    path="gender"
                    element={
                        <ProgressBar
                            percentage="0"
                            prev="welcome"
                            next="preferences"
                        />
                    }
                />
                <Route
                    path="preferences"
                    element={
                        <ProgressBar percentage="20" prev="gender" next="bio" />
                    }
                />
                <Route
                    path="bio"
                    element={
                        <ProgressBar
                            percentage="40"
                            prev="preferences"
                            next="interests"
                        />
                    }
                />
                <Route
                    path="interests"
                    element={
                        <ProgressBar
                            percentage="60"
                            prev="bio"
                            next="pictures"
                        />
                    }
                />
                <Route
                    path="pictures"
                    element={
                        <ProgressBar
                            percentage="80"
                            prev="interests"
                            next="done"
                        />
                    }
                />
                <Route
                    path="done"
                    element={
                        <ProgressBar percentage="100" prev="pictures" next="" />
                    }
                />
            </Routes>
        </div>
    )
}

export default Onboarding
