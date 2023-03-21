import { Autocomplete, Chip, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import './TagsAutocomplete.css'

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

const TagsAutocomplete = ({ onChange, defaultValues = [] }) => {
    const [userInput, setUserInput] = useState('')
    const [matchingTags, setMatchingTags] = useState([])
    let timer = new Date()
    let interval = null

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
        <Autocomplete
            multiple
            id="tags_autocomplete"
            defaultValue={defaultValues}
            options={matchingTags.map((tag) => tag.bwid)}
            freeSolo
            renderTags={(value, getTagProps) => {
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
            onChange={onChange}
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
    )
}

export default TagsAutocomplete
