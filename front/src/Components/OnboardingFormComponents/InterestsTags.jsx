import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { USER_STATE_ACTIONS } from '../../constants'
import TagsAutocomplete from '../TagsAutocomplete/TagsAutocomplete'
import './OnboardingForm.css'

const InterestsTags = () => {
    const [tags, setTags] = useState(
        useSelector((state) => state.userState.userSettings.tags)
    )
    const dispatch = useDispatch()

    const saveTags = () => {
        dispatch({
            type: USER_STATE_ACTIONS.UPDATE_TAGS,
            payload: tags,
        })
    }

    return (
        <div id="gender_selection_container">
            <p id="gender_selection_catch_phrase">
                What are <b>your interests?</b>
            </p>

            <TagsAutocomplete
                value={tags}
                setValue={(e, tagsList) => {
                    setTags(tagsList)
                }}
            />

            <div>
                <Link to="/onboarding/pictures">
                    <button id="onboarding_next_button" onClick={saveTags}>
                        Next
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default InterestsTags
