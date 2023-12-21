import _ from "lodash";
import upload from "../middlewares/upload.js";
import { User } from "../models/user.model.js";
import fs from "fs";

async function removeOldPictures(req) {
  const login = req.params.login;

  if (!login) {
    return;
  }

  const user = await User.getUserByLogin(login);

  const pictures = [];
  if (user.imgA) pictures.push(user.imgA);
  if (user.imgB) pictures.push(user.imgB);
  if (user.imgC) pictures.push(user.imgC);
  if (user.imgD) pictures.push(user.imgD);
  if (user.imgE) pictures.push(user.imgE);

  // Remove all pictures
  for (let i = 0; i < pictures.length; i++) {
    const picture = pictures[i];
    if (picture) {
      fs.stat(picture, function (err, stats) {
        if (!err) {
          fs.unlink(picture, function (err) {
            if (err) return console.log(err);
          });
        }
      });
    }
  }
}

export default async function (req, res, next) {
  // if user is defined and no pictures, skip
  if (req.body.user && !req.body.user.pictures) return next();

  try {
    console.log("req.body", req.body);
    await removeOldPictures(req);
    await upload(req, res);
    console.log("req.files");
    // All pictures were removed
    if (typeof req.body.user === "undefined") req.body.user = {};
    if (Object.keys(req.files).length > 0) {
      // If not user is set, set it to empty object so update will trigger, and images will be saved
      req.body.user.pictures = req.files;
    } else {
      req.body.user.pictures = {};
    }
  } catch (error) {
    console.log(error);
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    return res.send(`Error when trying upload files: ${error}`);
  }
  next();
}
