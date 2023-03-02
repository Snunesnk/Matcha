import React, { useEffect, useState } from 'react'
import './OnboardingForm.css'
import { Autocomplete, Chip, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { USER_STATE_ACTIONS } from '../../constants'

const InterestsTags = () => {
    const [userInput, setUserInput] = useState('')
    const [matchingTags, setMatchingTags] = useState([
        {
            bwid: 'test',
        },
        {
            bwid: 'test2',
        },
        {
            bwid: 'test3',
        },
    ])
    let tags
    const dispatch = useDispatch()

    const saveTags = () => {
        // dispatch({
        //     type: USER_STATE_ACTIONS.UPDATE_TAGS,
        //     payload: tags,
        // })
    }

    useEffect(() => {
        // const options = {
        //     method: 'GET',
        // }
        // fetch('http://localhost:8080/api/tag?prefix=' + userInput, options)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setMatchingTags(data)
        //     })
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
                            {...getTagProps({ index })}
                        />
                    ))
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        id="tags_text_field"
                        label="Interests tags"
                        placeholder="+ Add tags"
                        variant="filled"
                        value={(e) => setUserInput(e.target.value)}
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
