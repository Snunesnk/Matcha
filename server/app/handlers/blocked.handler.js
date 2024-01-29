import { Blocked } from "../models/blocked.model.js";
import { Like } from "../models/like.model.js";
import { User } from "../models/user.model.js";

export default class {
  static block = async (req, res) => {
    const blocked = req.body.blockedLogin;
    const user = req.decodedUser.login;

    if (!blocked) {
      res.status(400).send({
        message: `Missing blocked parameter`,
      });
      return;
    }

    try {
      const blockedUser = await User.getFullUserByLogin(blocked);
      if (!blockedUser) {
        res.status(404).send({
          message: `User ${blocked} not found`,
        });
        return;
      }

      const blockedByUser = await Blocked.getAllBlockedByLogin(user);
      console.log(blockedByUser);
      if (blockedByUser) {
        const test = blockedByUser.find((blk) => blk.blocked === blocked);
        if (test) {
          res.status(400).send({
            message: `User ${user} already blocked ${blocked}`,
          });
          return;
        }
      }

      await Blocked.create({
        blocker: user,
        blocked: blocked,
      });

      await Like.delete({
        userLogin: user,
        likedLogin: blocked,
      });

      res.status(200).send({
        message: `User ${user} blocked ${blocked}`,
      });
    } catch (error) {
      res.status(500).send({
        message: `Error blocking user ${blocked}`,
      });
    }
  };
}
