import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

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

    console.log("conversation", conversation);
    const messages = await Message.getMessagesFromConversation(
      conversation.conversation_id
    );

    const messagesWithLogin = messages.map((message) => {
      return {
        from: message.sender,
        content: message.message_content,
      };
    });

    res.json(messagesWithLogin);
  }

  static async deleteConversation(req, res) {
    const login = req.params.login;
    const login2 = req.params.login2;
    const conversation = await Conversation.deleteConversation(login, login2);
    res.json(conversation);
  }
}
