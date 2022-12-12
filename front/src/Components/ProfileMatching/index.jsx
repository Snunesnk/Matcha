import { Grid } from "@mui/material";
import React, { useState } from "react";
import ProfileCard from "../ProfileCard";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ClearIcon from '@mui/icons-material/Clear';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import "./index.css"

const ProfileMatching = () => {
    const [cardState, setCardState] = useState("");
    const [profileCards, setProfileCards] = useState([
        {
            url: "/src/assets/cat_profile.jpg",
            name: "Jon the cat",
            age: "7"
        },
        {
            url: "/src/assets/cat_profile.jpg",
            name: "Jon the cat",
            age: "7"
        },]);
    let transitioning = false;

    const displayNextCard = () => {
        console.log("shifting");
        setProfileCards(prev => {
            return prev.shift();
        })

        transitioning = false;
    }

    const setCardLiked = () => {
        setCardState("liked");
        if (!transitioning)
            setTimeout(displayNextCard, 500);
    }

    const setCardDisiked = () => {
        setCardState("disliked");
        if (!transitioning)
            setTimeout(displayNextCard, 500);
    }

    return (
        <div id="profile_matching">
            <Grid container>
                <Grid item xs={12} className="card_container">
                    {profileCards.length > 0 && (
                        <ProfileCard
                            url={profileCards[0].url}
                            name={profileCards[0].name}
                            age={profileCards[0].age}
                            className={cardState}
                        />)}
                    {profileCards.length == 0 && (
                        "We're sorry, we can't find anymore corresponding profiles"
                    )}
                </Grid>
                {profileCards.length > 0 && (

                    <Grid item xs={12}>
                        <div className="profile_matching_btn_container">
                            <button className="profile_matching_btn profile_matching_like" onClick={setCardLiked}>
                                <FavoriteBorderIcon />
                            </button>
                            <button className="profile_matching_btn profile_matching_more">
                                <MoreHorizIcon />
                            </button>
                            <button className="profile_matching_btn profile_matching_dislike" onClick={setCardDisiked}>
                                <ClearIcon />
                            </button>
                        </div>
                    </Grid>
                )}
            </Grid>
        </div >
    )
}

export default ProfileMatching;