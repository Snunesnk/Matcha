import React, { useState } from 'react'
import './OnboardingForm.css'
import ImageUpload from '../ImageUpload'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { USER_STATE_ACTIONS } from '../../constants'

const PicturesUploading = () => {
    const savedImages = useSelector(
        (state) => state.userState.userSettings.pictures
    )
    const [fileList, setFileList] = useState(() => {
        if (savedImages.length === 0) {
            return []
        }

        const imgs = []
        if (savedImages.imgA) imgs.push(savedImages.imgA)
        if (savedImages.imgB) imgs.push(savedImages.imgB)
        if (savedImages.imgC) imgs.push(savedImages.imgC)
        if (savedImages.imgD) imgs.push(savedImages.imgD)
        if (savedImages.imgE) imgs.push(savedImages.imgE)

        return imgs
    })

    const dispatch = useDispatch()

    const savePictures = () => {
        const pictures = {
            imgA: null,
            imgB: null,
            imgC: null,
            imgD: null,
            imgE: null,
        }
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

            <ImageUpload defaultImages={fileList} setFileList={setFileList} />

            <div>
                <Link to="/onboarding/done">
                    <button id="onboarding_next_button" onClick={savePictures}>
                        Finish
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default PicturesUploading
