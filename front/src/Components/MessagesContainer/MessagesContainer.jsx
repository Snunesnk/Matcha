import { useEffect, useState } from 'react'
import ChatComponent from '../ChatComponent'
import UserProfile from '../UserProfile/UserProfile'
import {ArrowBack,} from '@mui/icons-material'
import socket from '../../Socket/socket'
import './MessagesContainer.css'
import MessagesLeftPane from '../MessagesLeftPane/MessagesLeftPane'
import { useLocation } from 'react-router-dom'
import ApiService from '../../Services/api.service'

const COMPONENTS = {
    MESSAGE_LIST: 'MESSAGE_LIST',
    CHAT: 'CHAT',
    USER_PROFILE: 'USER_PROFILE',
}

const handleSocketMessage = (
    message,
    newMatches,
    activeConversation,
    setSocketMessage,
    setConversations,
    setNewMatches,
    activeUser,
    setActiveConversation,
) => {
    const matchUser = newMatches.find((match) => match.login === message.from)
    if (matchUser) {
        setNewMatches((prev) => {
            prev.splice(newMatches.indexOf(matchUser), 1)
            return prev
        })
        setConversations((prev) => [
            {
                ...matchUser,
                last_message_content: message.content,
                last_message_timestamp: new Date(Date.now()),
                read: activeConversation && activeConversation.login === message.from,
            },
            ...prev,
        ])
        setActiveConversation({
            ...matchUser,
            last_message_content: message.content,
            last_message_timestamp: new Date(Date.now()),
            read: activeUser.login === message.from,
        })
    } else {
        setSocketMessage(message)
        setConversations((prev) => {
            const conversation = prev.find((c) => c.login === message.from)
            if (conversation) {
                conversation.last_message_content = message.content
                conversation.last_message_timestamp = new Date(Date.now())
                conversation.read = message.from === activeConversation?.login
                prev.splice(prev.indexOf(conversation), 1)
                return [conversation, ...prev].sort((a, b) => {
                    const timestampA = new Date(
                        a.last_message_timestamp
                    ).getTime()
                    const timestampB = new Date(
                        b.last_message_timestamp
                    ).getTime()

                    return timestampB - timestampA
                })
            } else {
                return prev
            }
        })
    }
}
const handleSocketStatus = (status, setNewMatches, setConversations) => {
    setConversations((prev) => {
        const conversation = prev.find((c) => c.login === status.login)
        if (conversation) {
            conversation.online = status.online
            return [...prev]
        } else {
            return prev
        }
    })
    setNewMatches((prev) => {
        const match = prev.find((m) => m.login === status.login)
        if (match) {
            match.online = status.online
            return [...prev]
        } else {
            return prev
        }
    })
}

const MessagesContainer = () => {
    const [activeComponent, setActiveComponent] = useState(COMPONENTS.MESSAGE_LIST)
    const [conversations, setConversations] = useState([])
    const [newMatches, setNewMatches] = useState([])
    const [activeConversation, setActiveConversation] = useState(null)
    const [activeUser, setActiveUser] = useState(null)
    const [socketMessage, setSocketMessage] = useState(null)
    const [unlike, setUnlike] = useState(null)
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const user = searchParams.get('user')

    const checkForNewMatch = (message) => {
        if (message.type === 'unlike')
            setUnlike(message.payload)

        if (message.type !== 'match')
            return

        const matchUser = newMatches.find(
            (match) => match.name === message.payload.name
        )
        if (matchUser)
            return

        setNewMatches((prev) => [message.payload, ...prev])
    }

    useEffect(() => {
        const getMatches = async () => {
            ApiService.get('/matches')
                .then((data) => {
                    const newMatches = data.filter((m) => !m.last_message_id)
                    setNewMatches(newMatches)
                    const conversations = data
                        .filter((m) => m.last_message_id)
                        .sort((a, b) => {
                            const timestampA = new Date(
                                a.last_message_timestamp
                            ).getTime()
                            const timestampB = new Date(
                                b.last_message_timestamp
                            ).getTime()

                            return timestampB - timestampA
                        })
                    setConversations(conversations)

                    if (user) {
                        const conversation = conversations.find(
                            (c) => c.login === user
                        )
                        if (conversation) {
                            setActiveConversation(conversation)
                        } else {
                            const match = newMatches.find(
                                (m) => m.login === user
                            )
                            if (match) {
                                setActiveConversation(match)
                            }
                        }
                    } else if (conversations.length > 0) {
                        setActiveConversation(conversations[0])
                    } else if (newMatches.length > 0) {
                        setActiveConversation(newMatches[0])
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        getMatches()
    }, [unlike])

    useEffect(() => {
        if (!unlike) return;
        setActiveComponent(null)
        setActiveConversation(null)
        setActiveUser(null)
        setConversations([])
    }, [unlike])

    useEffect(() => {
        const handleSocketMessageEvent = (message) => {
            handleSocketMessage(
                message,
                newMatches,
                activeConversation,
                setSocketMessage,
                setConversations,
                setNewMatches,
                activeUser,
                setActiveConversation
            )
        }
        const handleSocketStatusEvent = (status) => {
            handleSocketStatus(status, setNewMatches, setConversations)
        }
        socket.on('message', handleSocketMessageEvent)
        socket.on('notification', checkForNewMatch)
        socket.on('online-status', handleSocketStatusEvent)

        return () => {
            socket.off('message', handleSocketMessageEvent)
            socket.off('notification', checkForNewMatch)
            socket.off('online-status', handleSocketStatusEvent)
        }
    }, [socket, newMatches, activeConversation])


    useEffect(() => {
        if (!activeConversation) 
            return

        setConversations((prev) => {
            const conversation = prev.find(
                (c) => c.login === activeConversation.login
            )
            if (conversation) {
                conversation.read = true
                return [...prev]
            } else {
                return prev
            }
        })

        ApiService.get('/user/' + activeConversation.login)
            .then((data) => {
                console.log(data)
                console.log(activeConversation)
                setActiveUser(data)
            })
            .catch((error) => {
                console.log(error)
            })

        ApiService.put('/notifications/read/' + activeConversation.login)
    }, [activeConversation])

    useEffect(() => {
        const matchConversation = conversations.filter(
            (c) => newMatches.findIndex((m) => m.login === c.login) !== -1
        )

        if (matchConversation) {
            setNewMatches((prev) => {
                const newMatchesCopy = [...prev]
                matchConversation.forEach((c) => {
                    const index = newMatchesCopy.findIndex(
                        (m) => m.login === c.login
                    )
                    newMatchesCopy.splice(index, 1)
                })
                return newMatchesCopy
            })
        }
    }, [conversations])

    return (
        <div id="message-pannel">
            <div id="messages_component_container">
                <div id="chat_list_container"
                    data-active={
                        activeComponent === COMPONENTS.MESSAGE_LIST ||
                        activeComponent === COMPONENTS.NOTIFICATION
                    }
                    className="responsive-component"
                >
                    <MessagesLeftPane
                        newMatches={newMatches}
                        conversations={conversations}
                        setActiveConversation={setActiveConversation}
                        setActiveComponent={setActiveComponent}
                    />
                </div>
                <div id="chat_container"
                    data-active={activeComponent === COMPONENTS.CHAT}
                    className="responsive-component"
                >
                    {activeConversation ? (
                        <ChatComponent
                            user={activeConversation}
                            components={COMPONENTS}
                            setActiveComponent={setActiveComponent}
                            socketMessage={socketMessage}
                            setConversations={setConversations}
                        />
                    ) : (
                        <div className="no-conversation">
                            <p>Still waiting for the purr-fect match ?</p>
                        </div>
                    )}
                </div>
                <div
                    id="user_info_container"
                    data-active={activeComponent === COMPONENTS.USER_PROFILE}
                    className="responsive-component"
                >
                    {activeUser ? (
                        <>
                            <UserProfile user={activeUser} unlikable={true} setUnlike={setUnlike} />
                            <div className="user-profile-go-back">
                                <ArrowBack onClick={() => {setActiveComponent(COMPONENTS.CHAT)}}/>
                            </div>
                        </>
                        ) : (<></>)}
                </div>
            </div>
        </div>
    )
}

export default MessagesContainer
