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

    const resizeImage = (imgFile, maxWidth) => {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => {
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                const aspectRatio = img.width / img.height
                canvas.width = maxWidth
                canvas.height = maxWidth / aspectRatio
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                canvas.toBlob((blob) => resolve(blob), imgFile.type)
            }
            img.onerror = reject
            img.src = URL.createObjectURL(imgFile)
        })
    }

    const onChange = async (e) => {
        const fileList = Array.from(e.target.files)
        const maxWidth = 800 // Set the maximum width for the images

        // Filter out non-image files
        const imageFiles = fileList.filter((file) =>
            file.type.startsWith('image/')
        )

        try {
            const resizedImages = await Promise.all(
                imageFiles.map((file) => resizeImage(file, maxWidth))
            )

            setFileList((currentFiles) => [...currentFiles, ...resizedImages])

            setImgs((currentImgs) => [
                ...currentImgs,
                ...resizedImages.map((blob) => URL.createObjectURL(blob)),
            ])
        } catch (error) {
            console.error('Error resizing images:', error)
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
                            img instanceof Blob
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
