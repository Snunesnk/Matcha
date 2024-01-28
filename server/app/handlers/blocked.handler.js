import { Blocked } from "../models/blocked.model.js";
import { Like } from "../models/like.model.js";
import { User } from "../models/user.model.js";

export default class {
  static block = async (req, res) => {
    const blockedLogin = req.body.blockedLogin;
    const user = req.decodedUser.login;

    if (!blockedLogin) {
      res.status(400).send({
        message: `Missing blockedLogin parameter`,
      });
      return;
    }

    try {
      const blockedUser = await User.getFullUserByLogin(blockedLogin);
      if (!blockedUser) {
        res.status(404).send({
          message: `User ${blockedLogin} not found`,
        });
        return;
      }

      const blockedByUser = await Blocked.getAllBlockedByLogin(user);

      if (
        blockedByUser.find((blocked) => blocked.blockedLogin === blockedLogin)
      ) {
        res.status(400).send({
          message: `User ${user} already blocked ${blockedLogin}`,
        });
        return;
      }

      await Blocked.create({
        userLogin: user,
        blockedLogin: blockedLogin,
      });

      await Like.delete({
        userLogin: user,
        likedLogin: blockedLogin,
      });

      res.status(200).send({
        message: `User ${user} blocked ${blockedLogin}`,
      });
    } catch (error) {
      res.status(500).send({
        message: `Error blocking user ${blockedLogin}`,
      });
    }
  };
}
