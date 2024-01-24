export default class {
  static async createMessage(req, res) {
    const login = req.params.login;
    const login2 = req.params.login2;
    const message = await Message.createMessage(login, login2);
    res.json(message);
  }

  static async getMessage(req, res) {
    const matchId = req.params.matchId;
    const message = await Message.getMessageFomMatch(matchId);
    if (!message) return res.json([]);

    res.json(message);
  }

  static async deleteMessage(req, res) {
    const login = req.params.login;
    const login2 = req.params.login2;
    const message = await Message.deleteMessage(login, login2);
    res.json(message);
  }
}
