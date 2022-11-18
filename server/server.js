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
// import "./app/routes/link.routes.js";
// require("./app/routes/user_tag.routes.js")(app);
// require("./app/routes/tag.routes.js")(app);
// require("./app/routes/view.routes.js")(app);
app.use("/api", userRoute)


// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
