import express, { json, urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";

// Setting /api routes
import userRoute from "./routes/user.routes.js";
import tagRoute from "./routes/tag.routes.js";
import likeRoute from "./routes/like.routes.js";
import viewRoute from "./routes/view.routes.js";
import imageRoute from "./routes/images.routes.js";
import authenticationRoute from "./routes/authentication.routes.js";
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

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONT_URL, // or the client-side application's host
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.use((socket, next) => {
  try {
    const token = socket.handshake.headers.cookie;
    console.log(token);
    console.log("test");

    // Extract the JWT token from the cookie
    const jwtToken = cookieParser.signedCookie(
      token["your-cookie-name"],
      "your-secret"
    );

    // Verify the JWT
    if (jwtToken) {
      jwt.verify(jwtToken, "your-jwt-secret", function (err, decodedToken) {
        if (err) {
          return next(new Error("Authentication error"));
        }
        socket.decoded = decodedToken;
        next();
      });
    } else {
      next(new Error("Authentication error"));
    }
  } catch (err) {
    next(new Error("Authentication error"));
  }
});

io.on("connection", (socket) => {
  console.log("Connected user:", socket.decoded);
  // now that you know the user is authenticated, and you have their data in `socket.decoded`
});

// Docker health check
app.use(
  "/isHealthy",
  express.Router().get("", (req, res) => {
    res.status(200).send("I'm healthy !");
  })
);

app.use("/api", userRoute);
app.use("/api", tagRoute);
app.use("/api", likeRoute);
app.use("/api", viewRoute);
app.use("/api", imageRoute);
app.use("/api", authenticationRoute);

// Populate DB with fake accounts if flag is set
if (
  process.argv.length >= 3 &&
  (process.argv[2] === "--populate-db" || process.argv[2] === "-p")
) {
  populateDB();
}

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
