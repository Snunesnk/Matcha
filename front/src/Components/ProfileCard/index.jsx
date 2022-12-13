import React, { useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import "./index.css";

const ProfileCard = ({ url, name, age, className }) => {
    const [liked, setLiked] = useState(false);
    const [city, setCity] = useState("Paris");

    console.log("Profile card");
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
        // <div>
        //         <div className="card_img_container">
        //             <img src="/src/assets/cat_profile.jpg" />
        //         </div>
        //         <div className="card_info_container">
        //             <div className="text_info">
        //                 <div className="name_and_age">
        //                     Jon the cat, 7
        //                 </div>
        //                 <div className="card_city">
        //                     {city}
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <div className="card_like">
        //         {liked && (
        //             <FavoriteIcon onClick={() => setLiked(false)} />
        //         )}
        //         {!liked && (
        //             <FavoriteBorderIcon onClick={() => setLiked(true)} />
        //         )}
        //     </div>
        // </div>

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