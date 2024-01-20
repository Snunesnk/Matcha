export default class {
  static async getConversations(req, res) {
    const login = req.params.login;
    const conversations = await Conversation.getConversations(login);
    res.json(conversations);
  }

  static async createConversation(req, res) {
    const login = req.params.login;
    const login2 = req.params.login2;
    const conversation = await Conversation.createConversation(login, login2);
    res.json(conversation);
  }

  static async getConversation(req, res) {
    const login = req.decodedUser.login;
    const login2 = req.params.login;
    const conversation = await Conversation.getConversation(login, login2);
    res.json(conversation);
  }

  static async deleteConversation(req, res) {
    const login = req.params.login;
    const login2 = req.params.login2;
    const conversation = await Conversation.deleteConversation(login, login2);
    res.json(conversation);
  }
}
