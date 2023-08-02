import { Grid } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import './Conversation.css'

const Conversation = ({ conversation, components, setActiveComponent }) => {
    const navigate = useNavigate()
    const params = useParams()

    return (
        <Grid
            item
            xs={12}
            className={
                'chat_message_container' +
                (params.id && params.id == conversation.id
                    ? ' chat_active'
                    : '')
            }
            onClick={() => {
                setActiveComponent(components.CHAT)
            }}
        >
            <div className="chat_img_container">
                <img src={conversation.profile_pic}></img>
            </div>
            <Grid container className="chat-infos-container">
                <Grid item xs={12}>
                    <div className="chat_username">{conversation.username}</div>
                </Grid>
                <Grid item xs={12}>
                    <div className="chat_last_message">
                        {conversation.last_msg}
                    </div>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Conversation
