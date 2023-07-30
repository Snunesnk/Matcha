import React, { useState } from 'react'
import { Grid } from '@mui/material'
import './index.css'
import { Link } from 'react-router-dom'

const ListChoice = ({ number, name, label, onclick = () => {}, to = '' }) => {
    const [isClicked, setIsClicked] = useState(false)

    const toggleClass = () => {
        setIsClicked(!isClicked)
    }

    return (
        <div className="list_choice">
            <Link to={to}>
                <div
                    className={
                        isClicked
                            ? 'list_choice_container selected'
                            : 'list_choice_container'
                    }
                    onClick={(e) => {
                        toggleClass()
                        onclick(label)
                    }}
                >
                    <div className="list_choice_number">{number}</div>
                    <label>{name}</label>
                </div>
            </Link>
        </div>
    )
}

export default ListChoice
