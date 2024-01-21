import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SendIcon from '@mui/icons-material/Send'
import PersonIcon from '@mui/icons-material/Person'
import './index.css'

const DUMMY_MESSAGES = [
    {
        from: 0,
        content: "What's a girl like you doing on an app like this",
    },
    {
        from: 1,
        content: 'seeing what I can find',
    },
    {
        from: 1,
        content: 'lol',
    },
    {
        from: 1,
        content: 'Who are you?',
    },
    {
        from: 0,
        content: 'Same question, who are you ???',
    },
    {
        from: 1,
        content: 'Well,that actually is a good question',
    },
    {
        from: 0,
        content: 'Glad you acknowlegde it',
    },
]

const ChatComponent = ({ user, components, setActiveComponent }) => {
    const [newMessage, setNewMessage] = useState('')
    const [messages, setMessages] = useState(null)

    const messageEnd = useRef(null)
    const messageInput = useRef(null)

    const sendMessage = () => {
        if (newMessage.length == 0) return

        setMessages((prev) => [
            ...prev,
            {
                from: 0,
                content: newMessage,
            },
        ])

        setNewMessage('')
    }

    useEffect(() => {
        fetch('http://localhost:8080/api/conversations/' + user.id, {
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
                setMessages(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

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
                            console.log('clicked')
                            setActiveComponent(components.MESSAGE_LIST)
                        }}
                    />
                    <img src={user.imgA} alt="profile_pic" />
                    <div className="message_username">{user.name}</div>
                </div>
                <div id="user-chat-more">
                    <PersonIcon
                        onClick={() =>
                            setActiveComponent(components.USER_PROFILE)
                        }
                    />
                </div>
            </div>
            <div id="chat_body">
                {messages === null && (
                    <div className="loading">
                        <p>Loading...</p>
                    </div>
                )}
                {messages !== null && messages.length === 0 && (
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
                                (message.from == 0 ? ' other' : ' self')
                            }
                            key={i}
                        >
                            <div className="message">{message.content}</div>
                        </div>
                    ))}
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
