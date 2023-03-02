import { User } from "../models/user.model.js";
import { cryptPassword } from "../services/password.service.js";

export default class {
  static async login(req, res) {
    const { login, password } = req.body;
    if (!login || !password) {
      res.status(400).send({
        message: "MISSING_DATA",
      });
      return;
    }

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
        res.status(401).send({
          message: "WRONG_CREDENTIALS",
        });
        return;
      }

      res.status(200).send({
        message: "User logged in successfully.",
      });
    } catch (error) {
      res.status(500).send({
        message: error.message || "Error occurred while logging in.",
      });
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

      const result = await User.sendVerificationMail(user);
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
      const result = await User.create(user);
      if (result !== null) {
        //// DEBUG ////
        // User.sendVerificationMail(result);
        console.log(
          `${process.env.FRONT_URL}/onboarding/verify/?login=${result.login}&token=${result.token}`
        );
        //// DEBUG ////

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
      const user = await User.getUserByLogin(login);
      if (user === null) {
        res.status(404).send({
          message: "USER_NOT_FOUND",
        });
        return;
      }

      if (user.token !== token) {
        res.status(401).send({
          message: "WRONG_TOKEN",
        });
        return;
      }

      const result = await User.updateByLogin(
        login,
        { verified: true, token: null }
      );
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
}
