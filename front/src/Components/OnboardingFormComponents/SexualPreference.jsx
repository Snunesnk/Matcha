import React from 'react'
import './OnboardingForm.css'
import ListChoice from '../ListChoice'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { USER_STATE_ACTIONS } from '../../constants'
import OnboardingCard from '../OnboardingCard/OnboardingCard'

const Preferences = [
    { number: 'A', name: 'Female', label: 'f' },
    { number: 'B', name: 'Male', label: 'm' },
    { number: 'C', name: 'Non-binary', label: 'nb' },
]

const SexualPreferences = () => {
    const genderSelected = []
    const dispatch = useDispatch()
    const savedPreferences = useSelector(
        (state) => state.userState.userSettings.preferences
    )

    if (savedPreferences.prefMale) genderSelected.push('m')
    if (savedPreferences.prefFemale) genderSelected.push('f')
    if (savedPreferences.prefEnby) genderSelected.push('nb')

    const OnPreferenceSelection = (label) => {
        if (genderSelected.indexOf(label) >= 0)
            genderSelected.splice(genderSelected.indexOf(label), 1)
        else genderSelected.push(label)
    }

    const savePreferences = () => {
        const preferences = {
            prefMale: false,
            prefFemale: false,
            prefEnby: false,
        }

        genderSelected.forEach((gender) => {
            switch (gender) {
                case 'm':
                    preferences.prefMale = true
                    break
                case 'f':
                    preferences.prefFemale = true
                    break
                case 'nb':
                    preferences.prefEnby = true
                    break
            }
        })

        dispatch({
            type: USER_STATE_ACTIONS.UPADTE_PREFERENCES,
            payload: preferences,
        })
    }

    const header = (
        <p id="gender_selection_catch_phrase">
            Who are you <b>attracted to?</b>
            <br />
            <i>Pick one, two, or all three - Love is limitless</i>
        </p>
    )

    const content = (
        <div id="choice_list">
            {Preferences.map((preference) => (
                <ListChoice
                    number={preference.number}
                    name={preference.name}
                    label={preference.label}
                    key={preference.number}
                    defaultSelected={genderSelected.includes(preference.label)}
                    onclick={OnPreferenceSelection}
                />
            ))}
        </div>
    )

    return (
        <OnboardingCard
            header={header}
            content={content}
            next={'/onboarding/bio'}
            btnText={'Next'}
            onClick={savePreferences}
            btnClass="sm"
        />
    )
}

export default SexualPreferences
