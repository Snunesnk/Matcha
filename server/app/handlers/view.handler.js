import { View } from "../models/view.model.js";
import { User } from "../models/user.model.js";

export default class {
    // Create and Save a new View
    static async create(req, res) {
        // Validate request
        if (!req.body) {
            res.status(400).send({
                message: "MISSING_DATA",
            });
            return;
        }

        const issuer = req.body.issuer;
        const receiver = req.body.receiver;

        const userIssuer = await User.getUserByLogin(receiver);
        const userReceiver = await User.getUserByLogin(issuer);
        if (userIssuer === null || userReceiver === null) {
            res.status(404).send({
                message: `Could not find user with login ${receiver} or ${issuer}`,
            });
            return;
        }

        // Create a View
        const view = {
            issuer: req.body.issuer,
            receiver: req.body.receiver,
        };

        try {
            // Save View in the database
            const result = await View.create(view);
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
                message: error.message || "Error occurred while creating the View.",
            });
        }
    }

    // Find a single View with a login
    static getReceivedViews = async (req, res) => {
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
            const data = await View.getReceivedViews(receiver);

            if (data === null) {
                res.status(404).send({
                    message: `Could not find Views for receiver ${receiver}`,
                });
                return;
            }
            res.send(data);
        } catch (error) {
            res.status(500).send({
                message: `Error retrieving Views for receiver ${receiver}`,
            });
        }
    };
}
