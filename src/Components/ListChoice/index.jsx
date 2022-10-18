import React from "react";
import { Grid } from "@mui/material";
import './index.css';

const ListChoice = ({ number, label, onclick = () => { alert("CC") } }) => {
    return (
        <Grid item xs={12}>
            <div className="list_choice_container" onClick={onclick}>
                <div className="list_choice_number">{number}</div>
                <label>{label}</label>
            </div>
        </Grid>
    )
}

export default ListChoice;