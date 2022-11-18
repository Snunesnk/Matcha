import { Grid } from "@mui/material";
import React from "react";
import "./index.css"

const ChatList = () => {
    return (
        <div id="chat_list">
            <div id="chat_list_title">
                <div>
                    Messages
                </div>
            </div>
            <div id="chat_list_container">
                <Grid container className="chat">
                    {messages.map((message, i) => {
                        return (
                            <Grid item xs={12}>
                                <img src={message.profile_pic}></img>
                                <div className="chat_username">{message.username}</div>
                                <div className="chat_last_message">{message.last_msg}</div>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        </div>
    );
}

export default ChatList;


const messages = [
    {
        profile_pic: "/src/assets/cat_profile.jpg",
        username: "Jon the cat",
        last_msg: "Hey, it's me Jon the cat!"
    },
    {
        profile_pic: "/src/assets/cat_profile.jpg",
        username: "Jon the cat",
        last_msg: "Hey, it's me Jon the cat!"
    },
    {
        profile_pic: "/src/assets/cat_profile.jpg",
        username: "Jon the cat",
        last_msg: "Hey, it's me Jon the cat!"
    },
    {
        profile_pic: "/src/assets/cat_profile.jpg",
        username: "Jon the cat",
        last_msg: "Hey, it's me Jon the cat!"
    },
    {
        profile_pic: "/src/assets/cat_profile.jpg",
        username: "Jon the cat",
        last_msg: "Hey, it's me Jon the cat!"
    },
    {
        profile_pic: "/src/assets/cat_profile.jpg",
        username: "Jon the cat",
        last_msg: "Hey, it's me Jon the cat!"
    },
    {
        profile_pic: "/src/assets/cat_profile.jpg",
        username: "Jon the cat",
        last_msg: "Hey, it's me Jon the cat!"
    },
    {
        profile_pic: "/src/assets/cat_profile.jpg",
        username: "Jon the cat",
        last_msg: "Hey, it's me Jon the cat!"
    },
    {
        profile_pic: "/src/assets/cat_profile.jpg",
        username: "Jon the cat",
        last_msg: "Hey, it's me Jon the cat!"
    },
    {
        profile_pic: "/src/assets/cat_profile.jpg",
        username: "Jon the cat",
        last_msg: "Hey, it's me Jon the cat!"
    },
    {
        profile_pic: "/src/assets/cat_profile.jpg",
        username: "Jon the cat",
        last_msg: "Hey, it's me Jon the cat!"
    },
    {
        profile_pic: "/src/assets/cat_profile.jpg",
        username: "Jon the cat",
        last_msg: "Hey, it's me Jon the cat!"
    },
    {
        profile_pic: "/src/assets/cat_profile.jpg",
        username: "Jon the cat",
        last_msg: "Hey, it's me Jon the cat!"
    },
    {
        profile_pic: "/src/assets/cat_profile.jpg",
        username: "Jon the cat",
        last_msg: "Hey, it's me Jon the cat!"
    },
]