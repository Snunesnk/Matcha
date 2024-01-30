import { DbRequestService } from "../services/db-request.service.js";
import { Conversation } from "./conversation.model.js";

const MESSAGE_TABLE = "messages";

export class Message {
  constructor(obj = {}) {
    this.message_id = obj.message_id;
    this.conversation_id = obj.conversation_id;
    this.sender = obj.sender;
    this.receiver = obj.receiver;
    this.message_content = obj.message_content;
    this.timestamp = obj.timestamp;
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
    if (sender) this._sender = sender.trim().substring(0, 50);
  }

  get receiver() {
    return this._receiver;
  }

  set receiver(receiver) {
    if (receiver) this._receiver = receiver.trim().substring(0, 50);
  }

  get message_content() {
    return this._message_content;
  }

  set message_content(message_content) {
    this._message_content = message_content;
  }

  get timestamp() {
    return this._timestamp;
  }

  set timestamp(timestamp) {
    if (timestamp && timestamp instanceof Date) this._timestamp = timestamp;
  }

  get read_status() {
    return this._read_status;
  }

  set read_status(read_status) {
    this._read_status = read_status;
  }

  static async create(newMessage) {
    let conv = await DbRequestService.getConversationFromLogins(
      newMessage.to,
      newMessage.from
    );

    if (!conv) {
      conv = await Conversation.createConvFromLogin(
        newMessage.to,
        newMessage.from
      );
    } else {
      conv = new Conversation(conv);
    }

    const message = new Message({
      conversation_id: conv.conversation_id,
      sender: newMessage.from,
      receiver: newMessage.to,
      message_content: newMessage.content,
      timestamp: new Date(Date.now()),
    });

    const data = await DbRequestService.create(MESSAGE_TABLE, message);
    if (data.affectedRows === 0) {
      return null;
    }

    await DbRequestService.update(
      "conversations",
      new Conversation({ ...conv, last_message_id: data.insertId }),
      { conversation_id: conv.conversation_id }
    );

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
      timestamp: this.timestamp,
      read_status: this.read_status,
    };
  }
}
