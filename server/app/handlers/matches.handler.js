import { Match } from "../models/matches.model.js";
import { checkIfUserIsOnline } from "../socket/socket.js";

export default class {
  static async getMatches(req, res) {
    const user = req.decodedUser;
    try {
      const newMatches = await Match.getMatches(user.login);

      if (!newMatches) {
        return res.status(200).send([]);
      }
      newMatches.forEach((match) => {
        match.online = false;
        const status = checkIfUserIsOnline(match.login);
        if (status) {
          match.online = true;
        }
      });

      res.status(200).send(newMatches);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving matches.",
      });
    }
  }
}
