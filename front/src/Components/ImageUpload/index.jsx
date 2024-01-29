import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import '../Settings/Settings.css'
import ApiService from '../../Services/api.service'

const ImageUpload = ({ defaultImages = [], setFileList = () => {} }) => {
    const [imgs, setImgs] = useState(defaultImages)
    const [pictureClicked, setPictureClicked] = useState(-1)
    const imgRef = useRef()

    useEffect(() => {
        setImgs(defaultImages)
    }, [defaultImages])

    useEffect(() => {
        function handleClickOutside(event) {
            if (imgRef.current && !imgRef.current.contains(event.target)) {
                setPictureClicked(-1)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [imgRef])

    const onChange = (e) => {
        const fileList = e.target.files;

        setFileList((currentFiles) => {
            const updatedFiles = [...currentFiles];
            for (let i = 0; i < fileList.length && currentFiles.length + i < 5; i++) {
                updatedFiles.push(fileList[i]);
            }
            return updatedFiles;
        });

        setImgs((currentImgs) => {
            const updatedImgs = [...currentImgs];
            for (let i = 0; i < fileList.length && currentImgs.length + i < 5; i++) {
                updatedImgs.push(URL.createObjectURL(fileList[i]));
            }
            return updatedImgs;
        });
    }

    const removeImg = (img) => {
        const index = imgs.indexOf(img)
        setFileList((files) => {
            return files.filter((f, i) => i !== index)
        })
        setImgs((prev) => {
            return prev.filter((i) => i !== img)
        })
        setPictureClicked(-1)
    }

    return (
        <div className={'setting complex-setting'}>
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

            <div id="user-settings-pictures-container" ref={imgRef}>
                {imgs.length > 0 &&
                    imgs.map((img, i) => {
                        // Create URL if it not a URL
                        const imgUrl =
                            img.name !== undefined
                                ? URL.createObjectURL(img)
                                : ApiService.getImgPath(img)

                        return (
                            <div
                                className={
                                    'setting-picture-container' +
                                    (pictureClicked === i ? ' selected' : '')
                                }
                                key={i}
                                onClick={() => {
                                    setPictureClicked(i)
                                }}
                            >
                                <div
                                    className="user-setting-picture"
                                    style={{
                                        background: 'url(' + imgUrl + ')',
                                    }}
                                ></div>
                                <div className="setting-picture-delete">
                                    <button
                                        className="setting-picture-delete-btn"
                                        onClick={() => {
                                            removeImg(img)
                                        }}
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
