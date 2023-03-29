import { join } from "path";
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

    if (match.indexOf(file.mimetype) === -1) {
      var message = `${file.originalname} is invalid. Only accept png/jpeg/jpg.`;
      return callback(message, null);
    }

    var filename = `${Date.now()}-brichard-${file.originalname}`;
    callback(null, filename);
  },
});

var uploadFiles = multer({ storage: storage }).fields([
  { name: "imgA", maxCount: 1 },
  { name: "imgB", maxCount: 1 },
  { name: "imgC", maxCount: 1 },
  { name: "imgD", maxCount: 1 },
  { name: "imgE", maxCount: 1 },
]);
var uploadFilesMiddleware = util.promisify(uploadFiles);
export default uploadFilesMiddleware;
