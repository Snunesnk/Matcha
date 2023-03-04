import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Grid } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import SendIcon from '@mui/icons-material/Send'
import './index.css'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const DUMMY_MESSAGES = [
    {
        from: 1,
        content: 'Hey!',
    },
    {
        from: 1,
        content: 'How are you?',
    },
    {
        from: 1,
        content: 'What are you doing?',
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

const ChatComponent = () => {
    const params = useParams()
    const [newMessage, setNewMessage] = useState('')
    const [messages, setMessages] = useState(DUMMY_MESSAGES)
    const [person, setPerson] = useState({
        id: 1,
        profile_pic: '/src/assets/cat_profile.jpg',
        username: 'Jon the cat',
    })

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
        // Scroll to bottom only if user send a message
        if (messages[messages.length - 1].from != params.id)
            messageEnd.current?.scrollIntoView({ behavior: 'auto' })

        messageInput.current?.focus()
    }, [messages])

    return (
        <div id="messages_container">
            <div id="chat_header">
                <div id="person_info">
                    <div className="message_username">{person.username}</div>
                </div>
                <div id="user-chat-more">
                    <MoreVertIcon />
                </div>
            </div>
            <div id="chat_body">
                {messages.map((message, i) => (
                    <div
                        className={
                            'messsage_line' +
                            (message.from == 0 ? ' other' : '')
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
