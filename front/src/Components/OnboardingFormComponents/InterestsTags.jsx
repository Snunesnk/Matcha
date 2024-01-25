import React, { useState } from 'react'
import './OnboardingForm.css'
import { useDispatch, useSelector } from 'react-redux'
import { USER_STATE_ACTIONS } from '../../constants'
import OnboardingCard from '../OnboardingCard/OnboardingCard'
import TagsAutocomplete from '../TagsAutocomplete/TagsAutocomplete'

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

    const header = (
        <p id="gender_selection_catch_phrase">
            What are <b>your interests?</b>
        </p>
    )

    const content = (
        <div className="onboarding_tags_content">
            <p>
                Select existing tags, or add your own!
                <br />
                <i>At leat one tag is required</i>
            </p>
            <TagsAutocomplete
                value={tags}
                setValue={(e, tagsList) => setTags(tagsList)}
            />
        </div>
    )

    return (
        <OnboardingCard
            header={header}
            content={content}
            next={'/onboarding/pictures'}
            btnText={'Next'}
            onClick={saveTags}
            btnClass="sm"
        />
    )
}

export default InterestsTags
