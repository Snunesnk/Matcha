import { Match } from "../models/matches.model.js";

export default class {
  static async getMatches(req, res) {
    const user = req.decodedUser;
    try {
      const newMatches = await Match.getMatches(user.login);
      res.status(200).send(newMatches);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving matches.",
      });
    }
  }
}
