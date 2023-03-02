import { DbRequestService } from "../services/db-request.service.js";

export class View {
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

    static async create(newView) {
        const data = await DbRequestService.create('view', new View(newView));
        if (data.affectedRows === 0) {
            return null;
        }
        return newView;
    }

    static async getReceivedViews(receiver) {
        const data = await DbRequestService.read('view', { receiver: `${receiver}` });
        if (data.length === 0) {
            return null;
        }
        return new View(data[0]);
    }

    toJSON() {
        return {
            receiver: this.receiver,
            issuer: this.issuer,
        }
    }
}