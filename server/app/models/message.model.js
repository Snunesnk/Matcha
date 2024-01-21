import { DbRequestService } from "../services/db-request.service.js";

const MESSAGE_TABLE = "messages";

export class Message {
  constructor(obj = {}) {
    this.message_id = obj.message_id;
    this.conversation_id = obj.conversation_id;
    this.sender = obj.sender;
    this.receiver = obj.receiver;
    this.message_content = obj.message_content;
    this.message_timestamp = obj.message_timestamp;
    this.read_status = obj.read_status;
  }

  get message_id() {
    return this._message_id;
  }

  set message_id(message_id) {
    this._message_id = message_id;
  }

  get conversation_id() {
    return this._conversation_id;
  }

  set conversation_id(conversation_id) {
    this._conversation_id = conversation_id;
  }

  get sender() {
    return this._sender;
  }

  set sender(sender) {
    this._sender = sender;
  }

  get receiver() {
    return this._receiver;
  }

  set receiver(receiver) {
    this._receiver = receiver;
  }

  get message_content() {
    return this._message_content;
  }

  set message_content(message_content) {
    this._message_content = message_content;
  }

  get message_timestamp() {
    return this._message_timestamp;
  }

  set message_timestamp(message_timestamp) {
    this._message_timestamp = message_timestamp;
  }

  get read_status() {
    return this._read_status;
  }

  set read_status(read_status) {
    this._read_status = read_status;
  }

  static async create(newMessage) {
    const data = await DbRequestService.create(MESSAGE_TABLE, newMessage);
    if (data.affectedRows === 0) {
      return null;
    }
    return await Message.getMessageById(data.insertId);
  }

  static async getMessageById(messageId) {
    const data = await DbRequestService.read(MESSAGE_TABLE, {
      message_id: `${messageId}`,
    });
    if (data.length === 0) {
      return null;
    }
    return new Message(data[0]);
  }

  static async getMessagesFromConversation(conversationId) {
    const data = await DbRequestService.read(MESSAGE_TABLE, {
      conversation_id: `${conversationId}`,
    });
    return data.map((message) => new Message(message));
  }

  toJson() {
    return {
      message_id: this.message_id,
      conversation_id: this.conversation_id,
      sender: this.sender,
      receiver: this.receiver,
      message_content: this.message_content,
      message_timestamp: this.message_timestamp,
      read_status: this.read_status,
    };
  }
}