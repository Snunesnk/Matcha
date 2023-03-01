import React, { useState } from 'react'
import './OnboardingForm.css'
import ImageUpload from '../ImageUpload'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { USER_STATE_ACTIONS } from '../../constants'

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

    return (
        <div id="gender_selection_container">
            <p id="gender_selection_catch_phrase">
                Upload <b>your pictures</b> (5 max)
            </p>

            <ImageUpload setFileList={setFileList}></ImageUpload>

            <Link to="/onboarding/done">
                <button id="onboarding_next_button" onClick={savePictures}>
                    Finish
                </button>
            </Link>
        </div>
    )
}

export default PicturesUploading
