import path, { join } from "path";
import multer, { diskStorage } from "multer";
import util from "util";

// __dirname is not defined in ES6 modules
// Thanks https://stackoverflow.com/a/50053801 for the trick
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

var storage = diskStorage({
  destination: (req, file, callback) => {
    callback(null, join(`${__dirname}../../uploads`));
  },
  filename: (req, file, callback) => {
    const match = ["image/png", "image/jpeg", "image/jpg"];
    const login = req.decodedUser._login;

    if (match.indexOf(file.mimetype) === -1) {
      var message = `${file.originalname} is invalid. Only accept png/jpeg/jpg.`;
      return callback(message, null);
    }

    let ext = path.extname(file.originalname);
    if (!ext || ext.length <= 1) {
      ext = "." + file.mimetype.split("/")[1];
    }

    const filename = file.fieldname + "-" + login + ext;
    callback(null, filename);
  },
});

var uploadFiles = multer({
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB file size limit
}).fields([
  { name: "imgA", maxCount: 1 },
  { name: "imgB", maxCount: 1 },
  { name: "imgC", maxCount: 1 },
  { name: "imgD", maxCount: 1 },
  { name: "imgE", maxCount: 1 },
]);
var uploadFilesMiddleware = util.promisify(uploadFiles);
export default uploadFilesMiddleware;
