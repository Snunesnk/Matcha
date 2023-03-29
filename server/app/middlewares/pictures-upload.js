import _ from "lodash";
import upload from "../middlewares/upload.js";

export default async function (req, res, next) {
  // if user is defined and no pictures, skip
  if (req.body.user && !req.body.user.pictures) return next();

  try {
    await upload(req, res);
    if (Object.keys(req.files).length > 0) {
      // If not user is set, set it to empty object so update will trigger, and images will be saved
      if (typeof req.body.user === "undefined") req.body.user = {};
      req.body.user.pictures = req.files;
    }
  } catch (error) {
    console.log(error);
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    return res.send(`Error when trying upload many files: ${error}`);
  }
  next();
}
