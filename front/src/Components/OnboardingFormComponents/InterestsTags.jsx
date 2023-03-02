import React, { useEffect, useState } from 'react'
import './OnboardingForm.css'
import { Autocomplete, Chip, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { USER_STATE_ACTIONS } from '../../constants'

const getMatchingTags = (userInput, setMatchingTags) => {
    fetch('http://localhost:8080/api/tag?prefix=' + userInput, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => {
            // Add user input if not empty so it is always a choice
            if (
                userInput !== '' &&
                !data.some((tag) => tag.bwid === userInput)
            ) {
                setMatchingTags([{ bwid: userInput }, ...data])
            } else setMatchingTags(data)
        })
}

const DEBOUNCE_DELAY = 100

const InterestsTags = () => {
    const [userInput, setUserInput] = useState('')
    const [matchingTags, setMatchingTags] = useState([])
    let tags = []
    const dispatch = useDispatch()
    // Debounce
    let timer = new Date()
    let interval = null

    const saveTags = () => {
        dispatch({
            type: USER_STATE_ACTIONS.UPDATE_TAGS,
            payload: tags,
        })
    }

    useEffect(() => {
        if (interval !== null) clearInterval(interval)
        if (new Date() - timer < DEBOUNCE_DELAY) {
            interval = setTimeout(() => {
                timer = new Date()
                getMatchingTags(userInput, setMatchingTags)
            }, DEBOUNCE_DELAY)
        } else {
            timer = new Date()
            getMatchingTags(userInput, setMatchingTags)
        }
    }, [userInput])

    return (
        <div id="gender_selection_container">
            <p id="gender_selection_catch_phrase">
                What are <b>your interests?</b>
            </p>

            <Autocomplete
                multiple
                id="tags_autocomplete"
                options={matchingTags.map((tag) => tag.bwid)}
                freeSolo
                renderTags={(value, getTagProps) => {
                    tags = value.map((val) => {
                        return {
                            bwid: val,
                        }
                    })

                    return value.map((item, index) => (
                        <Chip
                            variant="outlined"
                            label={item}
                            key={index}
                            {...getTagProps({ index })}
                        />
                    ))
                }}
                onInputChange={(event, newInputValue) => {
                    setUserInput(newInputValue)
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        id="tags_text_field"
                        label="Interests tags"
                        placeholder="+ Add tags"
                        variant="filled"
                    />
                )}
            />

            <Link to="/onboarding/pictures">
                <button id="onboarding_next_button" onClick={saveTags}>
                    Next
                </button>
            </Link>
        </div>
    )
}

export default InterestsTags
