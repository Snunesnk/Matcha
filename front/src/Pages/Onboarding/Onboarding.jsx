import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import './Onboarding.css'
import ProgressBar from '../../Components/ProgressBar'

const Onboarding = () => {
    return (
        <div id="onboarding">
            <div id="cat_pic"></div>
            <div id="onboarding_child_container">
                {/* Onboarding children */}
                <Outlet />
            </div>

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
