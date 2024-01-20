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

// id: 9,
// name: 'Robin',
// photo: 'https://picsum.photos/200/300?random=1',
// isOnline: false,

// {
//     id: 'convo9',
//     name: 'Robin',
//     photo: 'https://picsum.photos/200/300?random=1',
//     isOnline: false,
//     lastMessageDate: 'Mar 25',
//     lastMessage: 'Hey, how are you?',
//     unread: false,
// },

const MessagesContainer = () => {
    const [activeComponent, setActiveComponent] = useState(
        COMPONENTS.MESSAGE_LIST
    )
    const [conversations, setConversations] = useState([])
    const [newMatches, setNewMatches] = useState([])

    useEffect(() => {
        console.log('activeComponent', activeComponent)
    }, [activeComponent])

    useEffect(() => {
        const getMatches = async () => {
            fetch('http://localhost:8080/api/matches', {
                method: 'GET',
                credentials: 'include',
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('Something went wrong ...')
                })
                .then((data) => {
                    console.log('data', data)
                    const newMatches = data.filter((m) => !m.last_message_id)
                    setNewMatches(newMatches)
                    const conversations = data.filter((m) => m.last_message_id)
                    setConversations(conversations)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        getMatches()
    }, [])

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
                        conversations={conversations}
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
