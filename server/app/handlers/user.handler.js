const User = require("../models/user.model.js");

// Create and Save a new User
exports.create = async (req, res) => {
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

  let result;
  try {
    // Save User in the database
    result = await User.create(user);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the User.",
    });
    return ;
  }

  // Still need to fetch user tags here

  res.send({ ...result, interests: [] });
};

// Retrieve all Users from the database (with condition).
exports.findAll = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const gender = req.query.gender;

  User.getAll(gender, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else
      res.send(
        data.map((user) => {
          return { ...user, interests: [] };
        })
      );
  });
};

// Find a single User with a login
exports.findOne = async (req, res) => {
  const login = req.params.login;

  if (!login) {
    res.status(400).send({
      message: `Missing login`,
    })
    return ;
  }

  try {
    const data = await User.findByLogin(login);
    res.send({ ...data, interests: [] });
  } catch (error) {
    if (error.kind === "not_found") {
      res.status(404).send({
        message: `Could not find User with login ${req.params.login}.`,
      });
      return ;
    }
    else {
      res.status(500).send({
        message: `Error retrieving User with login: ${login}`,
      });
      return ;
    }
  }
};

// find all published Users
exports.findAllVerified = (req, res) => {
  User.getAllVerified((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else
      res.send(
        data.map((user) => {
          return { ...user, interests: [] };
        })
      );
  });
};

// Update a User identified by the login in the request
exports.update = (req, res) => {
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
    } else res.send({ ...user, interests: [] });
  });
};

// Delete a User with the specified login in the request
exports.delete = (req, res) => {
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
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};
