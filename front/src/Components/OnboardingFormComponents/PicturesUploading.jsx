import React, { useState } from 'react'
import './OnboardingForm.css'
import ImageUpload from '../ImageUpload'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { USER_STATE_ACTIONS } from '../../constants'
import OnboardingCard from '../OnboardingCard/OnboardingCard'

const PicturesUploading = () => {
    const [fileList, setFileList] = useState([])
    const dispatch = useDispatch()

    const savePictures = () => {
        const pictures = { imgA: {}, imgB: {}, imgC: {}, imgD: {}, imgE: {} }
        fileList.forEach((file, i) => {
            switch (i) {
                case 0:
                    pictures.imgA = file
                    break
                case 1:
                    pictures.imgB = file
                    break
                case 2:
                    pictures.imgC = file
                    break
                case 3:
                    pictures.imgD = file
                    break
                case 4:
                    pictures.imgE = file
                    break
            }
        })

        dispatch({
            type: USER_STATE_ACTIONS.UPDATE_PICTURES,
            payload: pictures,
        })
    }

    const header = (
        <p id="gender_selection_catch_phrase">
            Upload <b>your pictures</b> (5 max)
        </p>
    )

    const content = <ImageUpload setFileList={setFileList}></ImageUpload>

    return (
        <OnboardingCard
            header={header}
            content={content}
            next={'/onboarding/done'}
            btnText={'Finish'}
            onClick={savePictures}
        />
    )
}

export default PicturesUploading
