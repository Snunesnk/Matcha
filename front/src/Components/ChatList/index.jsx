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
            <div id="chat_display_container">
                <Grid container className="chat">
                    {messages.map((message, i) => {
                        return (
                            <Grid item xs={12} key={i}>
                                <Grid container item xs={12} className="chat_message_container">
                                    <Grid item xs={3}>
                                        <div className="chat_img_container">
                                            <img src={message.profile_pic}></img>
                                        </div>
                                    </Grid>
                                    <Grid item xs={7} className="chat_username_message_container">
                                        <div className="chat_username">{message.username}</div>
                                        <div className="chat_last_message">{message.last_msg}</div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        </div >
    );
}

export default ChatList;


const messages = [
    {
        profile_pic: "/src/assets/cat_profile.jpg",
        username: "Jon the cat",
        last_msg: "Hey, it's me Jon the cat! Long time no see, how are you doing ? Actually we never met but you get what I said right ?"
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