import { DbRequestService } from "../services/db-request.service.js";

export class Likes {
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

    static async create(newLike) {
        const likes = new Likes(newLike);
        const data = await DbRequestService.create('likes', likes);
        if (data.affectedRows === 0) {
            return null;
        }
        return likes;
    }

    // Return list of all login whith whom the user has a match
    static async getMatches(receiver) {
        const issued = await this.getRawIssuedLikes(receiver);
        const received = await this.getRawReceivedLikes(receiver);
        if (issued === null || received === null) {
            return null;
        }
        const matches = [];
        for (let i = 0; i < issued.length; i++) {
            for (let j = 0; j < received.length; j++) {
                if (issued[i].issuer === received[j].receiver) {
                    matches.push(received[i].issuer);
                }
            }
        }
        return matches;
    }

    static async getRawReceivedLikes(receiver) {
        const data = await DbRequestService.read('likes', { receiver: `${receiver}` });
        if (data.length === 0) {
            return null;
        }
        return data.map((likes) => new Likes(likes));
    }

    static async getRawIssuedLikes(issuer) {
        const data = await DbRequestService.read('likes', { issuer: `${issuer}` });
        if (data.length === 0) {
            return null;
        }
        return data.map((likes) => new Likes(likes));
    }

    static async getReceivedLikes(receiver) {
        let filtered = null;
        const received = await this.getRawReceivedLikes(receiver);

        if (received !== null) {
            // need to filter all received likes that we also issued
            const issued = await this.getRawIssuedLikes(receiver);
            if (issued !== null) {
                filtered = [];
                for (let i = 0; i < received.length; i++) {
                    for (let j = 0; j < issued.length; j++) {
                        if (received[i].issuer !== issued[j].issuer) {
                            filtered.push(received[i]);
                        }
                    }
                }
            }
        }
        return filtered || received;
    }

    static async getIssuedLikes(issuer) {
        let filtered = null;
        const issued = await getRawIssuedLikes(issuer);

        if (issued !== null) {
            // need to filter all issued likes that we also received
            const received = await this.getRawReceivedLikes(issuer);
            if (received !== null) {
                filtered = [];
                for (let i = 0; i < issued.length; i++) {
                    for (let j = 0; j < received.length; j++) {
                        if (issued[i].issuer !== received[j].issuer) {
                            filtered.push(issued[i]);
                        }
                    }
                }
            }
        }
        return filtered || issued;
    }

    static async delete(receiver, issuer) {
        const data = DbRequestService.delete('likes', { receiver: `${receiver}`, issuer: `${issuer}` });
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