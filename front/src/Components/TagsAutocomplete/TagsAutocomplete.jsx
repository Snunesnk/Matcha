import { Autocomplete, Chip, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import './TagsAutocomplete.css'
import ApiService from '../../Services/api.service'

const getMatchingTags = (userInput, setMatchingTags) => {
    ApiService.get('/tag?prefix=' + userInput)
        .then((data) => {
            // Add user input if not empty so it is always a choice
            if (
                userInput !== '' &&
                !data.some((tag) => tag.bwid === userInput)
            ) {
                setMatchingTags([{ bwid: userInput }, ...data])
            } else setMatchingTags(data)
        })
        .catch((error) => {
            console.log(error)
        })
}

const DEBOUNCE_DELAY = 100

const TagsAutocomplete = ({ value, setValue }) => {
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
            freeSolo
            id="tags_autocomplete"
            value={value}
            options={matchingTags.map((tag) => tag.bwid)}
            renderTags={(e, getTagProps) => {
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
            onChange={setValue}
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
