import { Tag } from "../models/tag.model.js";

export default class {
  // Retrieve all Tags from the database (with condition) with a given prefix.
  static getTagsTypeAhead = async (req, res) => {
    const filters = req.body.prefix ? { bwid: `${req.body.prefix}%` } : {};

    try {
      const data = await Tag.getAllTags(filters);
      res.send(data);
    } catch (error) {
      res.status(500).send({
        message: error.message || "Some error occurred while retrieving tags.",
      });
    }
  };
}
