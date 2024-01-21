import { Conversation } from "../models/conversation.model.js";

export default class {
  static async createConversation(req, res) {
    const login = req.params.login;
    const login2 = req.params.login2;
    const conversation = await Conversation.createConversation(login, login2);
    res.json(conversation);
  }

  static async getConversation(req, res) {
    const matchId = req.params.matchId;
    const conversation = await Conversation.getConversationFomMatch(matchId);
    if (!conversation) return res.json([]);

    console.log("conversations", conversation);

    res.json(conversation);
  }

  static async deleteConversation(req, res) {
    const login = req.params.login;
    const login2 = req.params.login2;
    const conversation = await Conversation.deleteConversation(login, login2);
    res.json(conversation);
  }
}
