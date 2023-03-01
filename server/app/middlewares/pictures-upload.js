import _ from "lodash";
import upload from "../middlewares/upload.js";

export default async function(req, res, next) {
    const pictures = req.body.user ? req.body.user.pictures : null;
    if (!pictures) {
        next();
        return;
    }
    req["multi-files"] = pictures;
    try {
        await upload(req, res);
        if (req.files.length > 0) {
            req.body.user.pictures = req.files;
        }
        console.log(req.files);
    } catch (error) {
        console.log(error);
        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.send("Too many files to upload.");
        }
        return res.send(`Error when trying upload many files: ${error}`);
    }
    next();
}