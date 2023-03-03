import { Block } from "../models/block.model.js";
import { User } from "../models/user.model.js";

export default class {
    // Create and Save a new Block
    static async create(req, res) {
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

        // Create a Block
        const block = {
            issuer: issuer,
            receiver: receiver,
        };

        try {
            // Save Block in the database
            const result = await Block.create(block);
            if (result !== null) {
                // If issuer is blocking a user, we delete the block from issuer to receiver to also break matches and conversations
                await Block.delete(issuer, receiver);
                res.status(200).send(result);
                return;
            }
            res.status(500).send({
                message: "COULD_NOT_CREATE",
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error occurred while creating the Block.",
            });
        }
    }

    // Retreive all received Blocks for a user
    static getReceivedBlocks = async (req, res) => {
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
            const data = await Block.getReceivedBlocks(receiver);
            res.send(data || []);
        } catch (error) {
            res.status(500).send({
                message: `Error retrieving Blocks for receiver ${receiver}`,
            });
        }
    }

    // Delete a Block with the specified login in the request
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
            const data = await Block.delete(issuer, receiver);
            if (data === null) {
                res.status(404).send({
                    message: `Could not find Block for issuer ${issuer} and receiver ${receiver}`,
                });
                return;
            }
            res.status(200).send({ message: "Block was deleted successfully!" });
        } catch (error) {
            res.status(500).send({
                message: `Could not delete Block for issuer ${issuer} and receiver ${receiver}`,
            });
        }
    };
}
