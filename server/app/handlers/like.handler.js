import { Like } from "../models/like.model.js";
import { Match } from "../models/matches.model.js";
import { Notifications } from "../models/notifications.model.js";
import { User } from "../models/user.model.js";
import { NOTIFICATION_TYPE, sendNotification } from "../socket/socket.js";

export default class {
  // Create and Save a new Like
  static async create(req, res) {
    const issuer = req.decodedUser._login;
    const receiver = req.body?.receiver;

    if (!receiver) {
      res.status(400).send({
        message: "MISSING_DATA",
      });
      return;
    }

    if (issuer === receiver) {
      res.status(400).send({
        message: "CANNOT_LIKE_YOURSELF",
      });
      return;
    }

    const alreadyLiked = await Like.getLike({ issuer, receiver });
    if (alreadyLiked !== null) {
      res.status(200).send({
        message: "ALREADY_LIKED",
      });
      return;
    }

    // like ok, update userRating
    const receiverUser = await User.getFullUserByLogin(receiver);
    if (receiverUser && receiverUser.rating < 100) {
      User.updateByLogin(receiver, {...receiverUser, rating: receiverUser.rating + 1})
    }

    const match = await User.checkBiDirectionnalMatch(issuer, receiver);
    if (!match || match.match_count === 0) {
      res.status(400).send({
        message: "CANNOT_LIKE_THIS_PROFILE",
      });
      return;
    }

    // Create a Like
    const like = {
      issuer: issuer,
      receiver: receiver,
    };

    try {
      const result = await Like.create(like);
      if (result !== null) {
        sendNotification(NOTIFICATION_TYPE.LIKE, { user: issuer });
        Notifications.create({
          login: receiver,
          trigger_login: issuer,
          type: NOTIFICATION_TYPE.LIKE,
          message: `${issuer} liked you!`,
        });

        const receiverMatch = await Like.getLike({
          issuer: receiver,
          receiver: issuer,
        });

        if (receiverMatch !== null) {
          sendNotification(NOTIFICATION_TYPE.MATCH, { user: issuer });
          Notifications.create({
            login: receiver,
            trigger_login: issuer,
            type: NOTIFICATION_TYPE.MATCH,
            name: match.likeeName,
            imgA: match.likeeImgA,
          });
          Notifications.create({
            login: issuer,
            trigger_login: receiver,
            type: NOTIFICATION_TYPE.MATCH,
            name: match.likerName,
            imgA: match.likerImgA,
          });

          Match.create({
            user1: issuer,
            user2: receiver,
          });

          res.status(200).send({
            match: true,
          });
          return;
        }

        res.status(200).send({ match: false });
        return;
      }
      res.status(500).send({
        message: "COULD_NOT_CREATE",
      });
    } catch (error) {
      res.status(500).send({
        message: error.message || "Error occurred while creating the Like.",
      });
    }
  }


  static async dislike(req, res) {
    const issuer = req.decodedUser._login;
    const receiver = req.body?.receiver;

    if (!receiver) {
      res.status(400).send({
        message: "MISSING_DATA",
      });
      return;
    }

    if (issuer === receiver) {
      res.status(400).send({
        message: "CANNOT_DISLIKE_YOURSELF",
      });
      return;
    }

    // like ok, update userRating
    const dislikedUser = await User.getFullUserByLogin(receiver);
    if (dislikedUser && dislikedUser.rating > 0) {
      User.updateByLogin(receiver, {...dislikedUser, rating: dislikedUser.rating - 1})
    }
  }
  
  // Find a single Like with a login
  static getReceivedLikes = async (req, res) => {
    const receiver = req.params.receiver;

    if (!receiver) {
      res.status(400).send({
        message: `Missing receiver`,
      });
      return;
    }

    const user = await User.getUserByLogin(receiver);
    if (user === null) {
      res.status(404).send({
        message: `Could not find user with login ${receiver}`,
      });
      return;
    }

    try {
      const data = await Like.getReceivedLikes(receiver);

      if (data === null) {
        res.status(404).send({
          message: `Could not find Likes for receiver ${receiver}`,
        });
        return;
      }
      res.send(data);
    } catch (error) {
      res.status(500).send({
        message: `Error retrieving Likes for receiver ${receiver}`,
      });
    }
  };

  // Find a single Like with a login
  static getMatches = async (req, res) => {
    const receiver = req.params.receiver;

    if (!receiver) {
      res.status(400).send({
        message: `Missing receiver`,
      });
      return;
    }

    const user = await User.getUserByLogin(receiver);
    if (user === null) {
      res.status(404).send({
        message: `Could not find user with login ${receiver}`,
      });
      return;
    }

    try {
      const data = await Like.getMatches(receiver);

      if (data === null) {
        res.status(404).send({
          message: `Could not find Matches for receiver ${receiver}`,
        });
        return;
      }
      res.send(data);
    } catch (error) {
      res.status(500).send({
        message: `Error retrieving Matches for receiver ${receiver}`,
      });
    }
  };

  // Delete a Like with the specified login in the request
  static delete = async (req, res) => {
    const user = req.decodedUser.login;
    const receiver = req.params.receiver

    if (!user || !receiver) {
      res.status(400).send({
        message: `Missing issuer or receiver`,
      });
      return;
    }

    try {
      const data = await Like.delete(receiver, user);
      if (data === null) {
        res.status(404).send({
          message: `Could not find Like with for issuer ${user} and receiver ${receiver}`,
        });
        return;
      }
      // TODO: UPDATE WEB SOCKET
      res.status(200).send({ message: "Like was deleted successfully!" });
    } catch (error) {
      res.status(500).send({
        message: `Could not delete Like for issuer ${user} and receiver ${receiver}`,
      });
    }
  };
}
