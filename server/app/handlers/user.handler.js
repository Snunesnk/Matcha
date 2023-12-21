import { User } from "../models/user.model.js";
import { cryptPassword } from "../services/password.service.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import authenticationService from "../services/authentication.service.js";

export default class {
  static async login(req, res) {
    const { login, password } = req.body;
    let rememberMe = req.body.rememberMe;

    if (!login || !password) {
      res.status(400).send({
        message: "MISSING_DATA",
      });
      return;
    }

    if (!rememberMe) rememberMe = false;

    try {
      const user = await User.getFullUserByLogin(login);
      if (user === null) {
        res.status(404).send({
          message: "WRONG_CREDENTIALS",
        });
        return;
      }

      if (user.verified !== true) {
        res.status(401).send({
          message: "EMAIL_NOT_VERIFIED",
        });
        return;
      }

      const isPasswordMatch = await user.passwordMatch(password);
      if (!isPasswordMatch) {
        res.status(404).send({
          message: "WRONG_CREDENTIALS",
        });
        return;
      }

      // Create remember-me cookie
      const jwtToken = await authenticationService.generateToken(
        user,
        rememberMe
      );
      const cookieOptions = {
        httpOnly: true, // Cookie inaccessible to browser's JavaScript
        maxAge: rememberMe
          ? 1000 * 60 * 60 * 24 * 7 // 7 days
          : 1000 * 60 * 60 * 1, // 1 hour
        path: "/",
      };

      console.log("remember_me cookie created successfully");
      console.log("remember_me cookie value:", jwtToken);
      console.log("remember_me cookie options:", cookieOptions);
      res.cookie("remember_me", jwtToken, cookieOptions);
      res.status(200).send({
        message: "LOG_IN_SUCCESS",
      });
    } catch (error) {
      res.status(500).send({
        message: "COULD_NOT_LOGIN",
      });
      console.log(error);
    }
  }

  // Send a verification mail to the User
  static async resendVerificationMail(req, res) {
    const login = req.params.login;
    try {
      const user = await User.getUserByLogin(login);
      if (user === null) {
        res.status(404).send({
          message: "USER_NOT_FOUND",
        });
        return;
      }

      if (user.verified === true) {
        res.status(400).send({
          message: "EMAIL_ALREADY_VERIFIED",
        });
        return;
      }

      const userToken = crypto.randomBytes(64).toString("base64url");
      user.token = userToken + "_mail_timestamp_" + Date.now();
      await User.updateByLogin(login, user);

      const result = await User.sendVerificationMail(user, userToken);
      if (result === true) {
        res.status(200).send({
          message: "Verification mail sent successfully.",
        });
        return;
      }
      res.status(500).send({
        message: "COULD_NOT_SEND_EMAIL",
      });
    } catch (error) {
      res.status(500).send({
        message:
          error.message || "Error occurred while sending verification mail.",
      });
    }
  }

  // Create and Save a new User
  static async create(req, res) {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "MISSING_DATA",
      });
      return;
    }

    // TODO - Validate birthdate

    // TODO - test password strength
    const password = await cryptPassword(req.body.password);
    if (password === null) {
      res.status(500).send({
        message: "PASSWORD_ENCRYPTION_ERROR",
      });
      return;
    }

    // Create a User
    const user = {
      login: req.body.login,
      password: password,
      email: req.body.email,
      name: req.body.name,
      surname: req.body.surname,
      dateOfBirth: req.body.dateOfBirth,
    };

    try {
      // Save User in the database
      const userToken = crypto.randomBytes(64).toString("base64url");
      user.token = userToken + "_mail_timestamp_" + Date.now();
      const result = await User.create(user);
      if (result !== null) {
        User.sendVerificationMail(result, userToken);

        res.status(200).send(result);
        return;
      }
      res.status(500).send({
        message: "COULD_NOT_CREATE",
      });
    } catch (error) {
      res.status(500).send({
        message: error.message || "Error occurred while creating the User.",
      });
    }
  }

  // Verify User's mail
  static async verifyUser(req, res) {
    const login = req.params.login;
    const token = req.params.token;

    if (!login || !token) {
      res.status(400).send({
        message: "MISSING_DATA",
      });

      return;
    }

    try {
      let result = await User.verifyLogin(login, token);
      if (result === -1) {
        res.status(404).send({
          message: "USER_NOT_FOUND",
        });
        return;
      }

      if (result == 0) {
        res.status(401).send({
          message: "WRONG_TOKEN",
        });
        return;
      }

      const rememberMeToken = crypto.randomBytes(64).toString("hex");
      const hashedToken = bcrypt.hashSync(rememberMeToken, 10);

      result = await User.updateByLogin(login, {
        verified: true,
        token: hashedToken,
      });
      if (result !== null) {
        res.status(200).send({
          message: "User verified successfully.",
        });
        return;
      }

      res.status(500).send({
        message: "COULD_NOT_VERIFY",
      });
    } catch (error) {
      res.status(500).send({
        message: error.message || "Error occurred while verifying the User.",
      });
    }
  }

  static async onboardUser(req, res) {
    const login = req.params.login;

    console.log("onboardUser", login);

    if (!login) {
      res.status(400).send({
        message: "MISSING_DATA",
      });

      return;
    }

    try {
      result = await User.updateByLogin(login, {
        onboarded: true,
      });
      if (result !== null) {
        res.status(200).send({
          message: "User onboarded successfully.",
        });
        return;
      }

      res.status(500).send({
        message: "COULD_NOT_ONBOARD",
      });
    } catch (error) {
      res.status(500).send({
        message: error.message || "Error occurred while onboarding the User.",
      });
    }
  }

  // Retrieve all Users from the database (with condition).
  static getAllUsers = async (req, res) => {
    const filters = req.body.filters || {};

    try {
      const data = await User.getAllUsers(filters);
      res.send(data);
    } catch (error) {
      res.status(500).send({
        message: error.message || "Some error occurred while retrieving users.",
      });
    }
  };

  // Find a single User with a login
  static getUserByLogin = async (req, res) => {
    const login = req.params.login;

    if (!login) {
      res.status(400).send({
        message: `Missing login`,
      });
      return;
    }

    try {
      const data = await User.getUserByLogin(login);

      if (data === null) {
        res.status(404).send({
          message: `Could not find User with login ${req.params.login}.`,
        });
        return;
      }
      res.send(data);
    } catch (error) {
      res.status(500).send({
        message: `Error retrieving User with login: ${login}`,
      });
    }
  };

  // find all published Users
  static getAllVerified = async (req, res) => {
    req.body.filters = {
      ...req.body.filters,
      verified: true,
    };
    return await this.getAllUsers(req, res);
  };

  // Update a User identified by the login in the request
  static update = async (req, res) => {
    const user = req.body.user || {};
    const login = req.params.login;

    if (!login || Object.keys(user).length === 0) {
      res.status(400).send({
        message: `Missing data`,
      });
      return;
    }

    if (user.preferences) {
      user.prefMale = user.preferences.prefMale;
      user.prefFemale = user.preferences.prefFemale;
      user.prefEnby = user.preferences.prefEnby;
    }

    if (user.pictures) {
      user.imagA = user.pictures.imagA[0].path;
      user.imagB = user.pictures.imagB[0].path;
      user.imagC = user.pictures.imagC[0].path;
      user.imagD = user.pictures.imagD[0].path;
      user.imagE = user.pictures.imagE[0].path;
    }

    try {
      const data = await User.updateByLogin(login, user);
      if (data === null) {
        // not found User with the login
        res.status(404).send({
          message: `Could not find User with login ${login}.`,
        });
        return;
      }
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send({
        error: { ...error },
        message: `Error updating User with login: ${login}`,
      });
    }
  };

  // Delete a User with the specified login in the request
  static delete = async (req, res) => {
    const login = req.params.login;

    if (!login) {
      res.status(400).send({
        message: `Missing login`,
      });
      return;
    }

    try {
      const data = await User.deleteByLogin(login);
      if (data === null) {
        res.status(404).send({
          message: `Could not find User with login ${login}.`,
        });
        return;
      }
      res.status(200).send({ message: "User was deleted successfully!" });
    } catch (error) {
      res.status(500).send({
        message: `Could not delete User with login ${login}`,
      });
    }
  };

  static currentUser = async (req, res) => {
    const user = req.user;

    if (!user) {
      res.status(200).send({
        user: null,
      });
    } else {
      res.status(200).send({
        user: user,
      });
    }
  };

  static sendResetPasswordMail = async (req, res) => {
    const email = req.params.email;

    if (!email) {
      res.status(400).send({
        message: `Missing mail`,
      });
      return;
    }

    try {
      const user = await User.getUserByMail(email);
      if (user === null) {
        res.status(404).send({
          message: "USER_NOT_FOUND",
        });
        return;
      }
      if (user.verified !== true) {
        res.status(401).send({
          message: "EMAIL_NOT_VERIFIED",
        });
        return;
      }

      // Check if previous mail was sent less than 15 minutes ago
      if (user?.token.includes("_mail_timestamp_")) {
        const timestamp = user.token.split("_mail_timestamp_")[1];
        if (Date.now() - timestamp < 15 * 60 * 1000) {
          res.status(400).send({
            message: "MAIL_ALREADY_SENT",
          });
          return;
        }
      }

      const userToken = crypto.randomBytes(64).toString("base64url");
      user.token = userToken + "_mail_timestamp_" + Date.now();
      await User.updateByLogin(user.login, user);

      const result = await User.sendResetPasswordMail(user, userToken);
      if (result === true) {
        res.status(200).send({
          message: "Reset password mail sent successfully.",
        });
        return;
      }
      res.status(500).send({
        message: "COULD_NOT_SEND_EMAIL",
      });
    } catch (error) {
      res.status(500).send({
        message:
          error.message || "Error occurred while sending reset password mail.",
      });
    }
  };

  static resetPassword = async (req, res) => {
    const { login, token } = req.body;
    let password = req.body.hashedPassword;

    if (!login || !token || !password) {
      res.status(400).send({
        message: `Missing data`,
      });
      return;
    }

    try {
      const user = await User.getChunkUserByLogin(login);
      if (user === null) {
        res.status(404).send({
          message: "USER_NOT_FOUND",
        });
        return;
      }

      const userToken = user.token.split("_mail_timestamp_")[0];
      if (!bcrypt.compareSync(userToken, token)) {
        console.log("correct token", userToken);
        console.log("received token", token);
        res.status(401).send({
          message: "WRONG_TOKEN",
        });
        return;
      }

      // TODO - test password strength
      password = await cryptPassword(password);
      if (password === null) {
        res.status(500).send({
          message: "PASSWORD_ENCRYPTION_ERROR",
        });
        return;
      }

      user.password = password;
      user.token = crypto.randomBytes(64).toString("base64url");
      user.token += "_mail_timestamp_" + Date.now();
      await User.updateByLogin(login, user);

      res.status(200).send({
        message: "SUCCESS",
      });
      return;
    } catch (error) {
      res.status(500).send({
        message: error.message || "Error occurred while resetting password.",
      });
    }
  };
}
