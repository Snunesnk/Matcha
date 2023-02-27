import express, { json, urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv"

dotenv.config();

const app = express();

var corsOptions = {
  origin: process.env.FRONT_URL
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

// Setting /api routes
import userRoute from "./app/routes/user.routes.js";

app.use("/api", userRoute)

// Docker health check
app.use("/isHealthy", express.Router().get("", (req, res) => {
  res.status(200).send("I'm healthy !");
}));

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});