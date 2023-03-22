import React, { useState } from 'react'
import './index.css'

const ImageUpload = ({ defaultImages = [], setFileList = () => {} }) => {
    const [imgs, setImgs] = useState(defaultImages)
    const imgList = []

    const saveBase64 = (file) => {
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
            imgList.push(reader.result.base64)
        }
        reader.onerror = function (error) {
            console.log('Error: ', error)
        }
    }

    const onChange = (e) => {
        const fileList = e.target.files

        for (let i = 0; i < fileList.length; i++) {
            saveBase64(fileList[i])
            setFileList((files) => [...files, fileList[i]])

            setImgs((prev) => {
                return [...prev, URL.createObjectURL(fileList[i])]
            })
        }
    }

    const removeImg = (img) => {
        setImgs((prev) => {
            return prev.filter((i) => i !== img)
        })
    }

    return (
        <div className="setting complex-setting">
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
                    imgs.map((img, i) => (
                        <div className="setting-picture-container" key={i}>
                            <div
                                className="user-setting-picture"
                                style={{
                                    background: 'url(' + img + ')',
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
                    ))}
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
