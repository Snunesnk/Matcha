import React, { useEffect, useState } from 'react'
import './index.css'
import '../UserSettings/UserSettings.css'

const ImageUpload = ({ defaultImages = [], setFileList = () => {} }) => {
    const [imgs, setImgs] = useState(defaultImages)

    useEffect(() => {
        setImgs(defaultImages)
    }, [defaultImages])

    const onChange = (e) => {
        const fileList = e.target.files
        const imgCount = imgs.length

        for (let i = 0; i < fileList.length && i + imgCount < 5; i++) {
            setFileList((files) => [...files, fileList[i]])

            setImgs((prev) => {
                return [...prev, URL.createObjectURL(fileList[i])]
            })
        }
    }

    const removeImg = (img) => {
        const index = imgs.indexOf(img)
        setFileList((files) => {
            return files.filter((f, i) => i !== index)
        })
        setImgs((prev) => {
            return prev.filter((i) => i !== img)
        })
    }

    return (
        <div
            className={
                'setting complex-setting' +
                (imgs.length === 0 ? ' no-img' : ' has-imgs')
            }
        >
            <div className="setting-infos">
                <div>Your pictures</div>
                <div>
                    <label
                        htmlFor="picture_upload_btn"
                        id="upload_pictures_btn_label"
                        className={imgs.length >= 5 ? 'disabled' : ''}
                    >
                        Upload
                    </label>
                </div>
            </div>
            {imgs.length === 0 && (
                <p>Add pictures to show everyone how beautiful you are !</p>
            )}
            <div id="user-settings-pictures-container">
                {imgs.length > 0 &&
                    imgs.map((img, i) => {
                        // Create URL if it not a URL
                        const imgUrl =
                            img.name !== undefined
                                ? URL.createObjectURL(img)
                                : img.includes('http')
                                ? img
                                : 'http://localhost:8080/api' + img

                        return (
                            <div className="setting-picture-container" key={i}>
                                <div
                                    className="user-setting-picture"
                                    style={{
                                        background: 'url(' + imgUrl + ')',
                                    }}
                                ></div>
                                <div className="setting-picture-delete">
                                    <button
                                        className="setting-picture-delete-btn"
                                        onClick={() => removeImg(img)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )
                    })}
            </div>

            <input
                multiple
                id="picture_upload_btn"
                type="file"
                value=""
                accept="image/png, image/jpeg"
                onChange={onChange}
                disabled={imgs.length >= 5}
            ></input>
        </div>
    )
}

export default ImageUpload
