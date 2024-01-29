import _ from "lodash";
import upload from "../middlewares/upload.js";
import fs from "fs";
import { User } from "../models/user.model.js";
import path from "path";

const pictures = ["imgA", "imgB", "imgC", "imgD", "imgE"];
const allowedExt = [".png", ".jpeg", ".jpg"];

async function removePicture(picturePath) {
  fs.stat(picturePath, function (err, stats) {
    if (!err) {
      fs.unlink(picturePath, function (err) {
        if (err) return;
      });
    }
  });
}

async function removeOldPictures(user, login) {
  const basePath = "/server/app/uploads/";
  const extName = path.extname(user.imgA);

  if (!user.imgB) removePicture(basePath + "imgB-" + login + extName);
  if (!user.imgC) removePicture(basePath + "imgC-" + login + extName);
  if (!user.imgD) removePicture(basePath + "imgD-" + login + extName);
  if (!user.imgE) removePicture(basePath + "imgE-" + login + extName);
}

export default async function (req, res) {
  const login = req.decodedUser._login;

  try {
    await upload(req, res);
    if (Object.keys(req.files).length === 0) {
      return res
        .status(400)
        .send({ message: "Please upload at least one file." });
    }

    const user = {
      imgA: null,
      imgB: null,
      imgC: null,
      imgD: null,
      imgE: null,
    };

    user.imgA = req.files.imgA[0].path;
    if (req.files.imgB) user.imgB = req.files.imgB[0].path;
    if (req.files.imgC) user.imgC = req.files.imgC[0].path;
    if (req.files.imgD) user.imgD = req.files.imgD[0].path;
    if (req.files.imgE) user.imgE = req.files.imgE[0].path;
    await removeOldPictures(user, login);

    const data = await User.updateByLogin(login, user);
    if (data === null) {
      // not found User with the login
      res.status(404).send({
        message: `Could not find User with login ${login}.`,
      });
      return;
    }
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(500).send("Too many files to upload.");
    }
    return res.status(500).send(`Error when trying upload files: ${error}`);
  }
}
