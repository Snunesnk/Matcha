import { Grid } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatComponent from '../ChatComponent'
import Conversation from '../Conversation/Conversation'

import './MessagesContainer.css'

const MessagesContainer = () => {
    const [showNotifications, setShowNotifications] = useState(false)
    const navigate = useNavigate()

    return (
        <div id="message-pannel">
            <Grid container id="messages_component_container">
                <Grid item xs={3} id="chat_list_container">
                    <div className="message-feed-selection-container">
                        <button
                            className={
                                'messages-category-btn' +
                                (showNotifications ? '' : ' selected')
                            }
                            onClick={() => {
                                setShowNotifications(false)
                                navigate('/dashboard/messages/chat')
                            }}
                        >
                            Messages
                        </button>
                        <button
                            className={
                                'messages-category-btn' +
                                (showNotifications ? ' selected' : '')
                            }
                            onClick={() => {
                                setShowNotifications(true)
                                navigate('/dashboard/messages/notifications')
                            }}
                        >
                            Feed
                        </button>
                    </div>
                    <Grid container id="chat_display_container">
                        {conversations.map((conversation, i) => {
                            return (
                                <Conversation
                                    conversation={conversation}
                                    key={i}
                                    showNotif={setShowNotifications}
                                />
                            )
                        })}
                    </Grid>
                </Grid>
                <Grid item xs={6} id="chat_container">
                    <ChatComponent />
                </Grid>
                <Grid item xs={3} id="user_info_container"></Grid>
            </Grid>
        </div>
    )
}

export default MessagesContainer

const conversations = [
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
