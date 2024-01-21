import { DbRequestService } from "../services/db-request.service.js";

const CONVERSATION_TABLE = "conversations";

export class Conversation {
  constructor(obj = {}) {
    this.conversation_id = obj.conversation_id;
    this.match_id = obj.match_id;
    this.last_message_id = obj.last_message_id;
  }

  get conversation_id() {
    return this._conversation_id;
  }

  set cnoversation_id(conversation_id) {
    this._conversation_id = conversation_id;
  }

  get match_id() {
    return this._match_id;
  }

  set match_id(match_id) {
    this._match_id = match_id;
  }

  get last_message_id() {
    return this._last_message_id;
  }

  set last_message_id(last_message_id) {
    this._last_message_id = last_message_id;
  }

  static async getConversationFomMatch(matchId) {
    const data = await DbRequestService.read(CONVERSATION_TABLE, {
      match_id: `${matchId}`,
    });

    if (data.length === 0) {
      return null;
    }

    return data[0];
  }

  toJSON() {
    return {
      conversation_id: this.conversation_id,
      match_id: this.match_id,
      last_message_id: this.last_message_id,
    };
  }
}
