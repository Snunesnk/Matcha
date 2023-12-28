import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import ChatComponent from '../ChatComponent'
import Conversation from '../Conversation/Conversation'
import UserProfile from '../UserProfile/UserProfile'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import './MessagesContainer.css'
import MessagesLeftPane from '../MessagesLeftPane/MessagesLeftPane'

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
    tags: 'pizza, workout, video games, hiking',
}

const COMPONENTS = {
    MESSAGE_LIST: 'MESSAGE_LIST',
    NOTIFICATION: 'NOTIFICATION',
    CHAT: 'CHAT',
    USER_PROFILE: 'USER_PROFILE',
}

const newMatches = [
    {
        id: 1,
        name: 'Alex',
        photo: 'https://picsum.photos/200/300?random=1',
        isOnline: true,
    },
    {
        id: 2,
        name: 'Jordan',
        photo: 'https://picsum.photos/200/300?random=1',
        isOnline: false,
    },
    {
        id: 3,
        name: 'Casey',
        photo: 'https://picsum.photos/200/300?random=1',
        isOnline: true,
    },
    {
        id: 4,
        name: 'Taylor',
        photo: 'https://picsum.photos/200/300?random=1',
        isOnline: false,
    },
    {
        id: 5,
        name: 'Robin',
        photo: 'https://picsum.photos/200/300?random=1',
        isOnline: true,
    },
    {
        id: 6,
        name: 'Alexis',
        photo: 'https://picsum.photos/200/300?random=1',
        isOnline: false,
    },
    {
        id: 7,
        name: 'Taylor',
        photo: 'https://picsum.photos/200/300?random=1',
        isOnline: false,
    },
    {
        id: 8,
        name: 'Alexis',
        photo: 'https://picsum.photos/200/300?random=1',
        isOnline: true,
    },
    {
        id: 9,
        name: 'Robin',
        photo: 'https://picsum.photos/200/300?random=1',
        isOnline: false,
    },
]

const convs = [
    {
        id: 'convo1',
        name: 'Taylor',
        photo: 'https://picsum.photos/200/300?random=1',
        isOnline: false,
        lastMessageDate: 'Apr 3',
        lastMessage: 'Hey, how are you?',
        unread: true,
    },
    {
        id: 'convo2',
        name: 'Alexis',
        photo: 'https://picsum.photos/200/300?random=1',
        isOnline: true,
        lastMessageDate: 'Apr 2',
        lastMessage: 'Wanna meet up tomorrow? We could go to starbucks',
        unread: false,
    },
    {
        id: 'convo3',
        name: 'Robin',
        photo: 'https://picsum.photos/200/300?random=1',
        isOnline: false,
        lastMessageDate: 'Mar 30',
        lastMessage: 'That was fun!',
        unread: false,
    },
    {
        id: 'convo4',
        name: 'Taylor',
        photo: 'https://picsum.photos/200/300?random=1',
        isOnline: false,
        lastMessageDate: 'Mar 30',
        lastMessage: 'Hey, how are you?',
        unread: false,
    },
    {
        id: 'convo5',
        name: 'Alexis',
        photo: 'https://picsum.photos/200/300?random=1',
        isOnline: true,
        lastMessageDate: 'Mar 29',
        lastMessage: 'Hey, how are you?',
        unread: false,
    },
    {
        id: 'convo6',
        name: 'Robin',
        photo: 'https://picsum.photos/200/300?random=1',
        isOnline: false,
        lastMessageDate: 'Mar 28',
        lastMessage: 'Hey, how are you?',
        unread: false,
    },
    {
        id: 'convo7',
        name: 'Taylor',
        photo: 'https://picsum.photos/200/300?random=1',
        isOnline: false,
        lastMessageDate: 'Mar 27',
        lastMessage: 'Hey, how are you?',
        unread: false,
    },
    {
        id: 'convo8',
        name: 'Alexis',
        photo: 'https://picsum.photos/200/300?random=1',
        isOnline: true,
        lastMessageDate: 'Mar 26',
        lastMessage: 'Hey, how are you?',
        unread: false,
    },
    {
        id: 'convo9',
        name: 'Robin',
        photo: 'https://picsum.photos/200/300?random=1',
        isOnline: false,
        lastMessageDate: 'Mar 25',
        lastMessage: 'Hey, how are you?',
        unread: false,
    },
]

const MessagesContainer = () => {
    const [activeComponent, setActiveComponent] = useState(
        COMPONENTS.MESSAGE_LIST
    )
    const [conversations, setConversations] = useState([])

    useEffect(() => {
        console.log('activeComponent', activeComponent)
    }, [activeComponent])

    return (
        <div id="message-pannel">
            <div id="messages_component_container">
                <div
                    id="chat_list_container"
                    data-active={
                        activeComponent === COMPONENTS.MESSAGE_LIST ||
                        activeComponent === COMPONENTS.NOTIFICATION
                    }
                    className="responsive-component"
                >
                    <MessagesLeftPane
                        newMatches={newMatches}
                        conversations={convs}
                    />
                </div>
                <div
                    id="chat_container"
                    data-active={activeComponent === COMPONENTS.CHAT}
                    className="responsive-component"
                >
                    <ChatComponent
                        user={DUMMY_USER}
                        components={COMPONENTS}
                        setActiveComponent={setActiveComponent}
                    />
                </div>
                <div
                    id="user_info_container"
                    data-active={activeComponent === COMPONENTS.USER_PROFILE}
                    className="responsive-component"
                >
                    <UserProfile user={DUMMY_USER} />
                    <div className="user-profile-go-back">
                        <ArrowBackIcon
                            onClick={() => {
                                setActiveComponent(COMPONENTS.CHAT)
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessagesContainer
