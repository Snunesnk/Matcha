import React, { useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import "./index.css";

const ProfileCard = ({ url, name, age, className }) => {
    const [liked, setLiked] = useState(false);
    const [city, setCity] = useState("Paris");

    // function getLocation() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.watchPosition(showPosition, showPositionEvenIfDisabled)
    //         showPositionEvenIfDisabled();
    //     }
    //     else {
    //         console.log("Geolocation is not supported by this browser.");
    //     }
    // }

    // function showPosition(position) {
    //     console.log(position);
    // }

    // function showPositionEvenIfDisabled() {
    //     console.log("Alright, let's do this the hard way");
    //     // fetch('https://ipapi.co/json/')
    //     //     .then(res => res.json())
    //     //     .then(json => setCity(json.city));
    // }

    // getLocation();

    return (
        <div className={"card_img_container " + className} style={{
            background: "url(" + url + ") 50% 50% / cover no-repeat",
        }}>
            <div className="name_and_age_container">
                <div className="name_and_age">
                    {name}, {age}
                </div>
            </div>
        </div >
    )
}

export default ProfileCard;