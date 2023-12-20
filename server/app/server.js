import express, { json, urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Setting /api routes
import userRoute from "./routes/user.routes.js";
import tagRoute from "./routes/tag.routes.js";
import likeRoute from "./routes/like.routes.js";
import viewRoute from "./routes/view.routes.js";
import imageRoute from "./routes/images.routes.js";
import populateDB from "./services/faker.service.js";

dotenv.config();

const app = express();

var corsOptions = {
  origin: process.env.FRONT_URL,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

// Docker health check
app.use(
  "/isHealthy",
  express.Router().get("", (req, res) => {
    res.status(200).send("I'm healthy !");
  })
);
// Cookie parser middleware
app.use((req, res, next) => {
  var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  // console.log("req", req);
  if (req.cookies) {
    const token = req.cookies["remember_me"];
    if (token) {
      const user = findUserByRememberMeToken(token);
      if (user) {
        // If the token is valid, attach the user to the request object
        req.user = user;
      }
    }
  } else {
    res.cookie("title", "GeeksforGeeks");
  }
  next();
});
app.use("/api", tagRoute);
app.use("/api", userRoute);
app.use("/api", likeRoute);
app.use("/api", viewRoute);
app.use("/api", imageRoute);

// Populate DB with fake accounts if flag is set
// if (
//   process.argv.length >= 3 &&
//   (process.argv[2] === "--populate-db" || process.argv[2] === "-p")
// ) {
//   populateDB();
// }

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
