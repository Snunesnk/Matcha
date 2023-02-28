import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Grid } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import SendIcon from '@mui/icons-material/Send'
import './index.css'

const ChatComponent = () => {
    const params = useParams()
    const [newMessage, setNewMessage] = useState('')
    const [messages, setMessages] = useState([
        {
            from: params.id,
            content: 'Hey!',
        },
        {
            from: params.id,
            content: 'How are you?',
        },
        {
            from: params.id,
            content: 'What are you doing?',
        },
        {
            from: params.id,
            content: 'Who are you?',
        },
        {
            from: 0,
            content: 'Same question, who are you ???',
        },
        {
            from: params.id,
            content: 'Well,that actually is a good question',
        },
        {
            from: 0,
            content: 'Glad you acknowlegde it',
        },
    ])
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
        <Grid container item xs={9}>
            <Grid item xs={6}></Grid>
            <Grid
                container
                item
                direction="column"
                justifyContent="space-between"
                id="messages_container"
            >
                <Grid item container id="chat_header">
                    <Grid item id="person_info">
                        <div className="chat_img_container_message">
                            <img src={person.profile_pic}></img>
                        </div>
                        <div className="message_username">
                            {person.username}
                        </div>
                    </Grid>
                    <Grid item>
                        <Link to="/dashboard">
                            <button className="close_messages_btn">
                                <ClearIcon />
                            </button>
                        </Link>
                    </Grid>
                </Grid>
                <Grid item id="chat_body">
                    {messages.map((message, i) => (
                        <div
                            className={
                                'messsage_line' +
                                (message.from == params.id ? ' other' : ' self')
                            }
                            key={i}
                        >
                            <div className="message">{message.content}</div>
                        </div>
                    ))}
                    <div ref={messageEnd}></div>
                </Grid>
                <Grid item id="chat_footer">
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
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ChatComponent
