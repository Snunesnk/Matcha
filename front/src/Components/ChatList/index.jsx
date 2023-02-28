import { Grid } from '@mui/material'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './index.css'

const ChatList = () => {
    const navigate = useNavigate()
    const params = useParams()

    const navigateToConv = (id) => {
        navigate('messages/' + id)
    }

    return (
        <div id="chat_list">
            <div id="chat_list_title">
                <div>Messages</div>
            </div>
            <div id="chat_display_container">
                <Grid container className="chat">
                    {messages.map((message, i) => {
                        return (
                            <Grid
                                container
                                item
                                xs={12}
                                className={
                                    'chat_message_container' +
                                    (params.id && params.id == message.id
                                        ? ' chat_active'
                                        : '')
                                }
                                key={i}
                                onClick={() => navigateToConv(message.id)}
                            >
                                <Grid item xs={3}>
                                    <div className="chat_img_container">
                                        <img src={message.profile_pic}></img>
                                    </div>
                                </Grid>
                                <Grid
                                    item
                                    xs={7}
                                    className="chat_username_message_container"
                                >
                                    <div className="chat_username">
                                        {message.username}
                                    </div>
                                    <div className="chat_last_message">
                                        {message.last_msg}
                                    </div>
                                </Grid>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        </div>
    )
}

export default ChatList

const messages = [
    {
        id: 1,
        profile_pic: '/src/assets/cat_profile.jpg',
        username: 'Jon the cat',
        last_msg:
            "Hey, it's me Jon the cat! Long time no see, how are you doing ? Actually we never met but you get what I said right ?",
    },
    {
        id: 2,
        profile_pic: '/src/assets/cat_profile.jpg',
        username: 'Jon the cat',
        last_msg: "Hey, it's me Jon the cat!",
    },
    {
        id: 3,
        profile_pic: '/src/assets/cat_profile.jpg',
        username: 'Jon the cat',
        last_msg: "Hey, it's me Jon the cat!",
    },
    {
        id: 4,
        profile_pic: '/src/assets/cat_profile.jpg',
        username: 'Jon the cat',
        last_msg: "Hey, it's me Jon the cat!",
    },
    {
        id: 5,
        profile_pic: '/src/assets/cat_profile.jpg',
        username: 'Jon the cat',
        last_msg: "Hey, it's me Jon the cat!",
    },
    {
        id: 6,
        profile_pic: '/src/assets/cat_profile.jpg',
        username: 'Jon the cat',
        last_msg: "Hey, it's me Jon the cat!",
    },
    {
        id: 7,
        profile_pic: '/src/assets/cat_profile.jpg',
        username: 'Jon the cat',
        last_msg: "Hey, it's me Jon the cat!",
    },
    {
        id: 8,
        profile_pic: '/src/assets/cat_profile.jpg',
        username: 'Jon the cat',
        last_msg: "Hey, it's me Jon the cat!",
    },
    {
        id: 9,
        profile_pic: '/src/assets/cat_profile.jpg',
        username: 'Jon the cat',
        last_msg: "Hey, it's me Jon the cat!",
    },
    {
        id: 10,
        profile_pic: '/src/assets/cat_profile.jpg',
        username: 'Jon the cat',
        last_msg: "Hey, it's me Jon the cat!",
    },
    {
        id: 11,
        profile_pic: '/src/assets/cat_profile.jpg',
        username: 'Jon the cat',
        last_msg: "Hey, it's me Jon the cat!",
    },
    {
        id: 12,
        profile_pic: '/src/assets/cat_profile.jpg',
        username: 'Jon the cat',
        last_msg: "Hey, it's me Jon the cat!",
    },
    {
        id: 13,
        profile_pic: '/src/assets/cat_profile.jpg',
        username: 'Jon the cat',
        last_msg: "Hey, it's me Jon the cat!",
    },
    {
        id: 14,
        profile_pic: '/src/assets/cat_profile.jpg',
        username: 'Jon the cat',
        last_msg: "Hey, it's me Jon the cat!",
    },
]
