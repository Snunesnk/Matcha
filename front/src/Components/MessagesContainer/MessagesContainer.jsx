import { Grid } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatComponent from '../ChatComponent'
import Conversation from '../Conversation/Conversation'
import UserProfile from '../UserProfile/UserProfile'

import './MessagesContainer.css'

const DUMMY_USER = {
    firstname: 'John',
    surname: 'Doe',
    gender: 'f',
    dateOfBirth: '2000-01-10',
    email: 'john.doe@test.com',
    login: 'john.doe',
    bio: 'A happy go lucky girl with a sharp tongue and wise eyes.',
    imgA: 'https://picsum.photos/200/300?random=1',
    imgB: 'https://picsum.photos/200/300?random=2',
    imgC: 'https://picsum.photos/200/300?random=3',
    imgD: 'https://picsum.photos/200/300?random=4',
    imgE: 'https://picsum.photos/200/300?random=5',
    tags: [
        { bwid: 'pizza' },
        { bwid: 'workout' },
        { bwid: 'video games' },
        { bwid: 'hiking' },
    ],
}

const MessagesContainer = () => {
    const [showNotifications, setShowNotifications] = useState(false)
    const navigate = useNavigate()

    return (
        <div id="message-pannel">
            <div container id="messages_component_container">
                <div id="chat_list_container">
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
                </div>
                <div xs={6} id="chat_container">
                    <ChatComponent user={DUMMY_USER} />
                </div>
                <div id="user_info_container">
                    <UserProfile user={DUMMY_USER} />
                </div>
            </div>
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
