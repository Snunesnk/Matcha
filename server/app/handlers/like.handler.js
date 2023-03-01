import { Like } from "../models/like.model.js";

export default class {
    // Create and Save a new Like
    static async create(req, res) {
        // Validate request
        if (!req.body) {
            res.status(400).send({
                message: "MISSING_DATA",
            });
            return;
        }

        // Create a Like
        const like = new Like({
            issuer: req.body.issuer,
            receiver: req.body.receiver,
        });

        try {
            // Save Like in the database
            const result = await Like.create(like);
            if (result !== null) {
                // TODO: UPDATE WEBSOCKET TO SEND MATCHES
                res.status(200).send(result);
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

    // Find a single Like with a login
    static getReceivedLikes = async (req, res) => {
        const receiver = req.params.receiver;

        if (!receiver) {
            res.status(400).send({
                message: `Missing receiver`,
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
        const issuer = req.params.issuer;
        const receiver = req.params.receiver;

        if (!issuer || !receiver) {
            res.status(400).send({
                message: `Missing issuer or receiver`,
            });
            return;
        }

        try {
            const data = await Like.delete(issuer, receiver);
            if (data.affectedRows === 0) {
                res.status(404).send({
                    message: `Could not find Like with for issuer ${issuer} and receiver ${receiver}`,
                });
                return;
            }
            // TODO: UPDATE WEB SOCKET
            res.status(200).send({ message: "Like was deleted successfully!" });
        } catch (error) {
            res.status(500).send({
                message: `Could not delete Like for issuer ${issuer} and receiver ${receiver}`,
            });
        }
    };
}
