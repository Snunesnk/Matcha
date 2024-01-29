import { useEffect, useRef, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SendIcon from '@mui/icons-material/Send'
import './index.css'
import { useDispatch } from 'react-redux'
import { USER_STATE_ACTIONS } from '../../constants'
import ApiService from '../../Services/api.service'

const ChatComponent = ({
    user,
    components,
    setActiveComponent,
    socketMessage,
    setConversations,
}) => {
    const [newMessage, setNewMessage] = useState('')
    const [messages, setMessages] = useState(null)
    const dispatch = useDispatch()
    const messageEnd = useRef(null)
    const messageInput = useRef(null)

    const sendMessage = () => {
        if (newMessage.length == 0) return

        dispatch({
            type: USER_STATE_ACTIONS.SEND_MESSAGE,
            payload: {
                to: user.login,
                content: newMessage,
            },
        })

        setMessages((prev) => {
            const newMes = {
                from: null,
                content: newMessage,
            }
            if (!prev) return [newMes]
            return [...prev, newMes]
        })

        setConversations((prev) => {
            const conversation = prev.find((c) => c.login === user.login)
            if (conversation) {
                conversation.last_message_content = newMessage
                conversation.last_message_timestamp = new Date(Date.now())
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
                return [
                    {
                        ...user,
                        last_message_content: newMessage,
                        last_message_timestamp: new Date(Date.now()),
                        read: true,
                    },
                    ...prev,
                ]
            }
        })

        setNewMessage('')
    }

    useEffect(() => {
        ApiService.get('/conversations/' + user.id)
            .then((data) => {
                setMessages(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [user])

    useEffect(() => {
        if (!socketMessage)
            return

        if (socketMessage.from !== user.login)
            return

        setMessages((prev) => {
            if (!prev) {
                return [
                    {
                        from: socketMessage.from,
                        content: socketMessage.content,
                    },
                ]
            }
            return [
                ...prev,
                {
                    from: socketMessage.from,
                    content: socketMessage.content,
                },
            ]
        })
    }, [socketMessage])

    useEffect(() => {
        messageEnd.current?.scrollIntoView({ behavior: 'auto' })
        messageInput.current?.focus()
    }, [messages])

    return (
        <div id="messages_container">
            <div id="chat_header">
                <div id="person_info">
                    <ArrowBackIcon
                        onClick={() => {
                            setActiveComponent(components.MESSAGE_LIST)
                        }}
                    />
                    <div
                        id="see-profile"
                        onClick={() =>
                            setActiveComponent(components.USER_PROFILE)
                        }
                    >
                        <div className="message-img-container">
                            <img
                                src={ApiService.getImgPath(user.imgA)}
                                alt="profile_pic"
                            />
                        </div>
                        <div className="message_username">{user.name}</div>
                    </div>
                </div>
            </div>
            <div id="chat_body">
                {!messages && (
                    <div className="loading">
                        <p>Loading...</p>
                    </div>
                )}
                {messages && messages.length === 0 && (
                    <div className="no-messages">
                        <p>Start the conversation</p>
                    </div>
                )}
                {messages !== null &&
                    messages.length > 0 &&
                    messages.map((message, i) => (
                        <div
                            className={
                                'messsage_line' +
                                (message.from === user.login
                                    ? ' other'
                                    : ' self')
                            }
                            key={i}
                        >
                            <div className="message">{message.content}</div>
                        </div>
                    ))}
                <div ref={messageEnd}></div>
            </div>
            <div id="chat_footer">
                <input
                    id="messages_input"
                    placeholder="Type your message here"
                    maxLength="280"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    autoFocus
                    ref={messageInput}
                    onKeyUp={(key) => {
                        if (key.code === 'Enter') sendMessage()
                    }}
                />
                <SendIcon
                    className="messages_send_icon"
                    onClick={sendMessage}
                />
            </div>
        </div>
    )
}

export default ChatComponent
