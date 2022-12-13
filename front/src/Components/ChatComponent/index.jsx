import { Grid } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import SendIcon from '@mui/icons-material/Send';
import "./index.css";


const ChatComponent = () => {
    const params = useParams();

    return (
        <Grid container item xs={9}>
            <Grid container item xs={4}></Grid>
            <Grid container item xs={8} id="messages_container">
                CC C les messages avec {params.id}
                <Link to="/dashboard/overview">
                    <button className="close_messages_btn">
                        <ClearIcon />
                    </button>
                </Link>

                <input
                    id="messages_input"
                    placeholder="Type your message here"
                />
                <SendIcon className="messages_send_icon" />
            </Grid>
        </Grid>
    )
}

export default ChatComponent;