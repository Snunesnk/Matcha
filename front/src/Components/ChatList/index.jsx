import { Grid } from '@mui/material'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './index.css'

const ChatList = () => {
    const navigate = useNavigate()
    const params = useParams()

    const navigateToConv = (id) => {
        navigate('messages/' + id)
    }

    return (
        <div id="chat_list">
            <div id="chat_list_title">
                <div>Messages</div>
            </div>
            <div id="chat_display_container">
                <Grid container className="chat">
                    {messages &&
                        messages.map((message, i) => {
                            return (
                                <Grid
                                    container
                                    item
                                    xs={12}
                                    className={
                                        'chat_message_container' +
                                        (params.id && params.id == message.id
                                            ? ' chat_active'
                                            : '')
                                    }
                                    key={i}
                                    onClick={() => navigateToConv(message.id)}
                                >
                                    <Grid item xs={3}>
                                        <div className="chat_img_container">
                                            <img
                                                src={message.profile_pic}
                                            ></img>
                                        </div>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={7}
                                        className="chat_username_message_container"
                                    >
                                        <div className="chat_username">
                                            {message.username}
                                        </div>
                                        <div className="chat_last_message">
                                            {message.last_msg}
                                        </div>
                                    </Grid>
                                </Grid>
                            )
                        })}
                </Grid>
            </div>
        </div>
    )
}

export default ChatList
