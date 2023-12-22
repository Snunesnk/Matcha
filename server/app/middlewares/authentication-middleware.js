import { User } from "../models/user.model.js";
import authenticationService from "../services/authentication.service.js";

export const needOnboardedMiddleware = async (req, res, next) => {
  const token = req.cookies.remember_me;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const decoded = authenticationService.verifyToken(token);
  if (!decoded) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const login = decoded.login;
  const user = await User.getUserByLogin(login);

  if (!user) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  if (!user.onboarded || !user.verified) {
    return res.status(403).send({ message: "Unauthorized!" });
  }

  req.decodedUser = user;
  next();
};

export const needVerifiedMiddleware = async (req, res, next) => {
  const token = req.cookies.remember_me;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const decoded = await authenticationService.verifyToken(token);
  if (!decoded) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const login = decoded.login;
  const user = await User.getUserByLogin(login);

  if (!user) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  if (!user.verified) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  req.decodedUser = user;
  next();
};
