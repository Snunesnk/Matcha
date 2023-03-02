import { Grid } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Message from '../Message/Message'

import './MessagesContainer.css'

const MessagesContainer = () => {
    const [showNotifications, setShowNotifications] = useState(false)
    const navigate = useNavigate()

    return (
        <>
            <Grid container id="messages_component_container">
                <Grid item xs={4} id="chat_list_container">
                    <div>
                        <Grid
                            item
                            container
                            xs={12}
                            className="message-feed-selection-container"
                        >
                            <button
                                className={
                                    'messages-category-btn' +
                                    (showNotifications ? ' selected' : '')
                                }
                                onClick={() => {
                                    setShowNotifications(true)
                                    navigate(
                                        '/dashboard/messages/notifications'
                                    )
                                }}
                            >
                                Show notifications
                            </button>
                        </Grid>
                        <div id="chat_display_container">
                            <Grid container id="chat">
                                {messages.map((message, i) => {
                                    return (
                                        <Message
                                            message={message}
                                            key={i}
                                            showNotif={setShowNotifications}
                                        />
                                    )
                                })}
                            </Grid>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default MessagesContainer

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
