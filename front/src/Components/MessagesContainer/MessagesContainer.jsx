import { useEffect, useState } from 'react'
import ChatComponent from '../ChatComponent'
import UserProfile from '../UserProfile/UserProfile'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import socket from '../../Socket/socket'
import './MessagesContainer.css'
import MessagesLeftPane from '../MessagesLeftPane/MessagesLeftPane'
import { useLocation } from 'react-router-dom'

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
    setConversations
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
                read: activeUser.login === message.from,
            },
            ...prev,
        ])
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

const MessagesContainer = () => {
    const [activeComponent, setActiveComponent] = useState(
        COMPONENTS.MESSAGE_LIST
    )
    const [conversations, setConversations] = useState([])
    const [newMatches, setNewMatches] = useState([])
    const [activeConversation, setActiveConversation] = useState(null)
    const [activeUser, setActiveUser] = useState(null)
    const [socketMessage, setSocketMessage] = useState(null)

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const user = searchParams.get('user')

    const checkForNewMatch = (message) => {
        if (message.type !== 'match') return

        const matchUser = newMatches.find(
            (match) => match.name === message.payload.name
        )
        if (matchUser) return

        setNewMatches((prev) => [message.payload, ...prev])
    }

    useEffect(() => {
        const getMatches = async () => {
            fetch('http://localhost:8080/api/matches', {
                method: 'GET',
                credentials: 'include',
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    } else if (response.status === 401) {
                        window.location.href = '/login'
                    } else throw new Error('Something went wrong ...')
                })
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
    }, [])

    useEffect(() => {
        const handleSocketMessageEvent = (message) => {
            handleSocketMessage(
                message,
                newMatches,
                activeConversation,
                setSocketMessage,
                setConversations
            )
        }
        socket.on('message', handleSocketMessageEvent)

        socket.on('notification', checkForNewMatch)

        return () => {
            socket.off('message', handleSocketMessageEvent)
            socket.off('notification', checkForNewMatch)
        }
    }, [socket, newMatches, activeConversation])

    useEffect(() => {
        if (!activeConversation) return

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

        fetch('http://localhost:8080/api/user/' + activeConversation.login, {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else if (response.status === 401) {
                    window.location.href = '/login'
                } else throw new Error('Something went wrong ...')
            })
            .then((data) => {
                setActiveUser(data)
            })
            .catch((error) => {
                console.log(error)
            })

        fetch(
            'http://localhost:8080/api/notifications/read/' +
                activeConversation.login,
            {
                method: 'PUT',
                credentials: 'include',
            }
        )
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
                        setActiveConversation={setActiveConversation}
                        setActiveComponent={setActiveComponent}
                    />
                </div>
                <div
                    id="chat_container"
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
                            <UserProfile user={activeUser} />
                            <div className="user-profile-go-back">
                                <ArrowBackIcon
                                    onClick={() => {
                                        setActiveComponent(COMPONENTS.CHAT)
                                    }}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="no-conversation">
                            {/* <p>Still waiting for the purr-fect match ?</p> */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MessagesContainer
