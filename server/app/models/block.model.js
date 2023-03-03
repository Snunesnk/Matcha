import { DbRequestService } from "../services/db-request.service.js";

export class Block {
    constructor(obj = {}) {
        this.receiver = obj.receiver;
        this.issuer = obj.issuer;
    }

    get receiver() {
        return this._receiver;
    }

    set receiver(receiver) {
        this._receiver = receiver;
    }

    get issuer() {
        return this._issuer;
    }

    set issuer(issuer) {
        this._issuer = issuer;
    }

    static async create(newBlock) {
        const block = new Block(newBlock);
        const data = await DbRequestService.create('block', block);
        if (data.affectedRows === 0) {
            return null;
        }
        return block;
    }

    static async getReceivedBlocks(receiver) {
        const data = await DbRequestService.read('block', { receiver: `${receiver}` });
        if (data.length === 0) {
            return null;
        }
        const received = data.map((block) => new Block(block));
        return received;
    }

    static async delete(receiver, issuer) {
        const data = DbRequestService.delete('block', { receiver: `${receiver}`, issuer: `${issuer}` });
        if (data.affectedRows === 0) {
            return null;
        }
        return true;
    }


    toJSON() {
        return {
            receiver: this.receiver,
            issuer: this.issuer,
        }
    }
}