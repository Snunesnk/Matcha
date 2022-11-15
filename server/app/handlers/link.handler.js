const Link = require("../models/link.model.js");

// Create and Save a new Link between two users
exports.create = (req, res) => {
  const userA = req.params.login_a;
  const userB = req.params.login_b;

  if (!!userA && !!userB) {
    // Save User in the database
    Link.create(userA, userB, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Link.",
        });
      else res.send({ ...data });
    });
  }
  else {
    res.status(500).send({
      message: "Missing one or two logins for link creation",
    });
  }
};

// // Retrieve all Users from the database (with condition).
// exports.findAll = (req, res) => {
//   const gender = req.query.gender;

//   User.getAll(gender, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving users.",
//       });
//     else
//       res.send(
//         data.map((user) => {
//           return { ...user, interests: [] };
//         })
//       );
//   });
// };

// // Find a single User with a login
// exports.findOne = (req, res) => {0
//   User.findByLogin(req.params.login, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found User with login ${req.params.login}.`,
//         });
//       } else {
//         res.status(500).send({
//           message: "Error retrieving User with login " + req.params.login,
//         });
//       }
//     } else res.send({ ...data, interests: [] });
//   });
// };

// // find all published Users
// exports.findAllVerified = (req, res) => {
//   User.getAllVerified((err, data) => {
//     if (err)
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving users.",
//       });
//     else
//       res.send(
//         data.map((user) => {
//           return { ...user, interests: [] };
//         })
//       );
//   });
// };

// // Update a User identified by the login in the request
// exports.update = (req, res) => {
//   // Validate Request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!",
//     });
//   }

//   console.log(req.body);

//   User.updateByLogin(req.params.login, new User(req.body), (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found User with login ${req.params.login}.`,
//         });
//       } else {
//         res.status(500).send({
//           message: "Error updating User with login " + req.params.login,
//         });
//       }
//     } else res.send({ ...user, interests: [] });
//   });
// };

// // Delete a User with the specified login in the request
// exports.delete = (req, res) => {
//   User.remove(req.params.login, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found User with login ${req.params.login}.`,
//         });
//       } else {
//         res.status(500).send({
//           message: "Could not delete User with login " + req.params.login,
//         });
//       }
//     } else res.send({ message: `User was deleted successfully!` });
//   });
// };

// // Delete all Users from the database.
// exports.deleteAll = (req, res) => {
//   User.removeAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         message: err.message || "Some error occurred while removing all users.",
//       });
//     else res.send({ message: `All Users were deleted successfully!` });
//   });
// };
