import { User } from "../models/user.model.js";

export default class {
  // Create and Save a new User
  static async create(req, res) {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return ;
    }

    // Create a User
    const user = new User({
      login: req.body.login,
      password: req.body.password,
      email: req.body.email,
      name: req.body.name,
      surname: req.body.surname,
    });

    try {
      // Save User in the database
      const result = await User.create(user);
      res.send({ ...result });
    } catch (error) {
      res.status(500).send({
        message: error.message || "Some error occurred while creating the User.",
      });
      return ;
    }
  }

  // Retrieve all Users from the database (with condition).
  static getAllUsers = async (req, res) => {
    // res.header("Access-Control-Allow-Origin", "*");
    const filters = req.body.filters || {};

    try {
      const data = await User.getAllUsers(filters);
      res.send(
        data.map((user) => {
          return { ...user };
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
      try {
        const data = await User.getAllVerified();
        res.send(
          data.map((user) => {
            return { ...user };
          })
        );
      } catch (error) {
        res.status(500).send({
          message: error.message || "Some error occurred while retrieving users.",
        });
      }
  };

  // Update a User identified by the login in the request
  static update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    console.log(req.body);

    User.updateByLogin(req.params.login, new User(req.body), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with login ${req.params.login}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating User with login " + req.params.login,
          });
        }
      } else res.send({ ...user });
    });
  };

  // Delete a User with the specified login in the request
  static delete = (req, res) => {
    User.remove(req.params.login, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with login ${req.params.login}.`,
          });
        } else {
          res.status(500).send({
            message: "Could not delete User with login " + req.params.login,
          });
        }
      } else res.send({ message: `User was deleted successfully!` });
    });
  };

  // Delete all Users from the database.
  static deleteAll = (req, res) => {
    User.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while removing all users.",
        });
      else res.send({ message: `All Users were deleted successfully!` });
    });
  };
}
