import React, { useState } from "react";
import "./index.css"
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { Grid } from "@mui/material";

const ImageUpload = ({ }) => {
    const [imgs, setImgs] = useState([]);
    const imgList = [];

    const saveBase64 = (file) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log(reader.result);
            imgList.push(reader.result.base64);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    const onChange = (e) => {
        const fileList = e.target.files;

        for (let i = 0; i < fileList.length; i++) {
            saveBase64(fileList[i]);

            setImgs((prev) => {
                return [...prev, URL.createObjectURL(fileList[i])];
            });
        }
    }

    return (
        <div id="image_upload_container" >
            {imgs.length === 0 && (
                <InsertPhotoIcon className="img_icon"></InsertPhotoIcon>)}
            <Grid container>
                {imgs.length > 0 && imgs.map((img, i) => (
                    <Grid item className="img_container" key={i}>
                        <img src={img} className="img_uploaded"></img>
                    </Grid>
                ))}
            </Grid>
            <p className="picture_upload_text">Show everyone how beautiful you are</p>

            <label htmlFor="picture_upload_btn" id="upload_pictures_btn_label">Choose image</label>

            <input
                multiple
                id="picture_upload_btn"
                type="file"
                value=""
                accept="image/png, image/jpeg"
                onChange={onChange}
                disabled={imgs.length >= 5}
            ></input>
        </div >
    );
}

export default ImageUpload