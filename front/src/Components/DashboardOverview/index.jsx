import { Grid } from '@mui/material'
import React from 'react'
import AdvancedSearch from '../AdvancedSearch'
import ProfileMatching from '../ProfileMatching'
import './index.css'

const DashboardOverview = () => (
    <Grid item container xs={9}>
        <Grid item xs={4}>
            <AdvancedSearch />
        </Grid>
        <Grid item xs={8}>
            <ProfileMatching />
        </Grid>
    </Grid>
)

export default DashboardOverview
