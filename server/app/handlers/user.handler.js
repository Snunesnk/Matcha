import { User } from "../models/user.model.js";
import { cryptPassword, comparePassword } from "../services/password.service.js";

export default class {
  static async login(req, res) {
    const { login, password } = req.body;
    if (!login || !password) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return ;
    }

    try {
      const user = await User.getUserByLogin(login);
      if (user.length === 0) {
        res.status(404).send({
          message: "User not found.",
        });
        return ;
      }

      const isPasswordMatch = await comparePassword(password, user[0].password);
      if (isPasswordMatch) {
        res.status(200).send({
          message: "User logged in successfully.",
        });
        return ;
      }

      res.status(401).send({
        message: "Invalid password.",
      });
    } catch (error) {
      res.status(500).send({
        message: error.message || "Error occurred while logging in.",
      });
    }
  }

  // Create and Save a new User
  static async create(req, res) {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return ;
    }

    // TODO - test password strength
    const password = await cryptPassword(req.body.password);
    if (password === null) {
      res.status(500).send({
        message: "Error occurred while hashing user's password.",
      });
      return ;
    }

    // Create a User
    const user = new User({
      login: req.body.login,
      password: password,
      email: req.body.email,
      name: req.body.name,
      surname: req.body.surname,
    });

    try {
      // Save User in the database
      const result = await User.create(user);
      if (result && result.affectedRows > 0) {
        res.status(200).send({ ...user, password: 'XXXXX' });
        return;
      }
      res.status(500).send({
        message: "Failed to add user to database without throwing error",
      });
    } catch (error) {
      res.status(500).send({
        message: error.message || "Error occurred while creating the User.",
      });
    }
  }

  // Retrieve all Users from the database (with condition).
  static getAllUsers = async (req, res) => {
    const filters = req.body.filters || {};

    try {
      const data = await User.getAllUsers(filters);
      res.send(
        data.map((user) => {
          return {
            ...user,
            password: 'XXXXX',
          };
        })
      );
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
      })
      return ;
    }

    try {
      const data = await User.getUserByLogin(login);

      if (data.length === 0) {
        res.status(404).send({
          message: `Could not find User with login ${req.params.login}.`,
        });
        return ;
      }
      res.send(data[0]);
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
    }
    return await this.getAllUsers(req, res);
  };

  // Update a User identified by the login in the request
  static update = async (req, res) => {
    const user = req.body.user || {};
    const login = req.params.login;

    if (!login || Object.keys(user).length === 0) {
      res.status(400).send({
        message: `Missing data`,
      })
      return ;
    }

    try {
      const data = await User.updateByLogin(login, user);
      if (data.affectedRows === 0) {
        // not found User with the login
        res.status(404).send({
          message: `Could not find User with login ${login}.`,
        });
      }
      res.status(200).send({ ...user, password: 'XXX' });
    } catch (error) {
      res.status(500).send({
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
      })
      return ;
    }

    try {
      const data = await User.deleteByLogin(login);
      if (data.affectedRows === 0) {
        // not found User with the login
        res.status(404).send({
          message: `Could not find User with login ${login}.`,
        });
      }
      res.status(200).send({ message: "User was deleted successfully!" });
    } catch (error) {
      res.status(500).send({
        message: `Could not delete User with login ${login}`,
      });
    }
  };
}
