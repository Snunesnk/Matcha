import { Grid } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import './Message.css'

const Message = ({ message, showNotif }) => {
    const navigate = useNavigate()
    const params = useParams()

    const navigateToConv = (id) => {
        navigate('' + id)
    }

    return (
        <Grid
            item
            xs={12}
            className={
                'chat_message_container' +
                (params.id && params.id == message.id ? ' chat_active' : '')
            }
            onClick={() => {
                navigateToConv(message.id)
                showNotif(false)
            }}
        >
            <div className="chat_img_container">
                <img src={message.profile_pic}></img>
            </div>
            <Grid container className="chat-infos-container">
                <Grid item xs={12}>
                    <div className="chat_username">{message.username}</div>
                </Grid>
                <Grid item xs={12}>
                    <div className="chat_last_message">{message.last_msg}</div>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Message
