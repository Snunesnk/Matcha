import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { checkIfUserIsOnline } from "../socket/socket.js";
import authenticationService from "../services/authentication.service.js";

export default class {
  static validate = async (req, res) => {
    const token = req.cookies.remember_me;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        const user = { loggedIn: false, onboarded: false, verified: false };
        res.json(user);
      } else {
        const user = await User.getUserByLogin(decoded.login);

        // Issue new token for sliding session
        const newToken = await authenticationService.generateToken(user);
        res.cookie("remember_me", newToken, {
          maxAge: 1000 * 60 * 15,
          httpOnly: true,
          path: "/",
        });

        res.json({
          loggedIn: true,
          onboarded: user.onboarded || false,
          verified: user.verified || false,
        });
      }
    });
  };
}
