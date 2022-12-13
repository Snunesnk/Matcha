import { Grid } from "@mui/material";
import React, { useState } from "react";
import ProfileCard from "../ProfileCard";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ClearIcon from '@mui/icons-material/Clear';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import "./index.css"

let profileCards = [
    {
        url: "/src/assets/cat_profile.jpg",
        name: "Jon the cat",
        age: "7"
    },
    {
        url: "/src/assets/cat_glasses.jpg",
        name: "Marc the bg",
        age: "5"
    }
];

const ProfileMatching = () => {
    const [cardState, setCardState] = useState("");
    const [actualCard, setactualCard] = useState({
        url: "/src/assets/cat_profile.jpg",
        name: "Jon the cat",
        age: "7"
    });

    let transitioning = false;

    const displayNextCard = () => {
        console.log(actualCard);
        setactualCard(profileCards.shift());

        transitioning = false;
        setCardState("");
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
                    {actualCard && (
                        <ProfileCard
                            url={actualCard.url}
                            name={actualCard.name}
                            age={actualCard.age}
                            className={cardState}
                        />)}
                    {!actualCard && (
                        "We're sorry, we can't find anymore corresponding profiles"
                    )}
                </Grid>
                {actualCard && (

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