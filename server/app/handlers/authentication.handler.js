import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export default class {
  static validate = async (req, res) => {
    const token = req.cookies.remember_me;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        const user = { loggedIn: false, onboarded: false, verified: false };
        res.json(user);
      } else {
        const user = await User.getUserByLogin(decoded.login);
        // TODO: Look into sockets to see if user is logged in
        res.json({
          loggedIn: true,
          onboarded: user.onboarded || false,
          verified: user._verified,
        });
      }
    });
  };
}
