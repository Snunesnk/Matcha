import { Grid } from "@mui/material";
import React from "react";
import ProfileCard from "../ProfileCard";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ClearIcon from '@mui/icons-material/Clear';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import "./index.css"

const ProfileMatching = () => {
    return (
        <div id="profile_matching">
            <Grid container>
                <Grid item xs={12} className="card_container">
                    <ProfileCard />
                </Grid>
                <Grid item xs={12}>
                    <div className="profile_matching_btn_container">
                        <button className="profile_matching_btn profile_matching_like">
                            <FavoriteBorderIcon />
                        </button>
                        <button className="profile_matching_btn profile_matching_more">
                            <MoreHorizIcon />
                        </button>
                        <button className="profile_matching_btn profile_matching_dislike">
                            <ClearIcon />
                        </button>
                    </div>
                </Grid>
            </Grid>
        </div >
    )
}

export default ProfileMatching;