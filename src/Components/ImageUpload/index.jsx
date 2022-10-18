import React, { useState } from "react";
import "./index.css"
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

const ImageUpload = ({ }) => {
    const [imgs, setImgs] = useState([]);

    function allowDrop(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        //Create instance 
        let fileReader = new FileReader();
        //Register event listeners
        fileReader.onload = () => {
            console.log("IMAGE LOADED: ", fileReader.result);

            //Read the file as a Data URL (which gonna give you a base64 encoded image data)
            setImgs((prev) => {
                prev.push(fileReader.result);

                return [...prev];
            });
        }
        //Operation Aborted 
        fileReader.onabort = () => {
            alert("Reading Aborted");
        }
        //Error when loading 
        fileReader.onerror = () => {
            alert("Reading ERROR!");
        }
    }

    return (
        <div id="image_upload_container" onDrop={e => drop(e)} onDragOver={e => allowDrop(e)}>
            {imgs.length === 0 && (
                <InsertPhotoIcon className="img_icon"></InsertPhotoIcon>)}
            {imgs.length >= 0 && imgs.map((img, i) => (
                <div key={i}>
                    <img source={img}></img>
                </div>
            ))}
            <p className="picture_upload_text">Drag and drop an image to upload, or</p>
            <label htmlFor="picture_upload_btn" id="upload_pictures_btn_label">Browse computer</label>
            <input id="picture_upload_btn" type="file" value="" onChange={() => { }}></input>
        </div >
    );
}

export default ImageUpload