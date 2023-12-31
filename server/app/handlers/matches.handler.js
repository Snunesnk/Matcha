import { Match } from "../models/matches.model.js";

export default class {
  static async getMatches(req, res) {
    // Get all matches + convs for one user
    // Then get user associated with matches
    const user = req.decodedUser;
    const newMatches = await Match.getMatches(user.login);
    res.status(200).send(newMatches);
  }
}
