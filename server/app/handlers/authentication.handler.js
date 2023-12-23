import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { checkIfUserIsOnline } from "../socket/socket.js";

export default class {
  static validate = async (req, res) => {
    const token = req.cookies.remember_me;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        const user = { loggedIn: false, onboarded: false, verified: false };
        res.json(user);
      } else {
        const user = await User.getUserByLogin(decoded.login);
        res.json({
          loggedIn: checkIfUserIsOnline(user.login),
          onboarded: user.onboarded || false,
          verified: user._verified,
        });
      }
    });
  };
}
