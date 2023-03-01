import { Tag } from "../models/tag.model.js";

export default class {
  // Create and Save a new Tag
  static async create(req, res) {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "MISSING_DATA",
      });
      return;
    }

    // Create a Tag
    const tag = new Tag({
      id: req.body.id,
      bwid: req.body.bwid,
    });

    try {
      // Save Tag in the database
      const result = await Tag.create(tag);
      if (result !== null) {
        res.status(200).send(result);
        return;
      }
      res.status(500).send({
        message: "COULD_NOT_CREATE",
      });
    } catch (error) {
      res.status(500).send({
        message: error.message || "Error occurred while creating the Tag.",
      });
    }
  }

  // Retrieve all Tags from the database (with condition).
  static getAllTags = async (req, res) => {
    const filters = req.body.filters || {};

    try {
      const data = await Tag.getAllTags(filters);
      res.send(data);
    } catch (error) {
      res.status(500).send({
        message: error.message || "Some error occurred while retrieving tags.",
      });
    }
  };

  // Find a single Tag with a login
  static getTagByBwid = async (req, res) => {
    const login = req.params.login;

    if (!login) {
      res.status(400).send({
        message: `Missing login`,
      });
      return;
    }

    try {
      const data = await Tag.getTagByBwid(login);

      if (data === null) {
        res.status(404).send({
          message: `Could not find Tag with login ${req.params.login}.`,
        });
        return;
      }
      res.send(data);
    } catch (error) {
      res.status(500).send({
        message: `Error retrieving Tag with login: ${login}`,
      });
    }
  };

  // Update a Tag identified by the login in the request
  static update = async (req, res) => {
    const tag = req.body.tag || {};
    const login = req.params.login;

    if (!login || Object.keys(tag).length === 0) {
      res.status(400).send({
        message: `Missing data`,
      });
      return;
    }

    try {
      const data = await Tag.updateByLogin(login, new Tag(tag));
      if (data === null) {
        // not found Tag with the login
        res.status(404).send({
          message: `Could not find Tag with login ${login}.`,
        });
        return;
      }
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send({
        error: { ...error },
        message: `Error updating Tag with login: ${login}`,
      });
    }
  };

  // Delete a Tag with the specified login in the request
  static delete = async (req, res) => {
    const login = req.params.login;

    if (!login) {
      res.status(400).send({
        message: `Missing login`,
      });
      return;
    }

    try {
      const data = await Tag.deleteByLogin(login);
      if (data.affectedRows === 0) {
        // not found Tag with the login
        res.status(404).send({
          message: `Could not find Tag with login ${login}.`,
        });
        return;
      }
      res.status(200).send({ message: "Tag was deleted successfully!" });
    } catch (error) {
      res.status(500).send({
        message: `Could not delete Tag with login ${login}`,
      });
    }
  };
}
