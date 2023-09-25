import { DbRequestService } from "../services/db-request.service.js";
import { Tag } from "./tag.model.js";

export class UserTag {
    constructor(obj = {}) {
        this.userLogin = obj.userLogin;
        this.tagBwid = obj.tagBwid;
    }

    get userLogin() {
        return this._userLogin;
    }

    set userLogin(userLogin) {
        this._userLogin = userLogin;
    }

    get tagBwid() {
        return this._tagBwid;
    }

    set tagBwid(tagBwid) {
        this._tagBwid = tagBwid;
    }

    static async create(newUserTag) {
        // checks if TAG exists, if not, creates it
        const tag = await Tag.getTagByBwid(newUserTag.tagBwid);
        if (tag === null) {
            const newTag = await Tag.create(new Tag({ bwid: newUserTag.tagBwid }));
            if (newTag === null) {
                console.log("Tag didn't exist, but couldn't create it");
                return null;
            }
        }
        const data = await DbRequestService.create('userTag', newUserTag)
        if (data.affectedRows === 0) {
            return null;
        }
        return await UserTag.getUserTagByBwid(newUserTag.tagBwid);
    }

    static async getAllUserTags(filters = {}) {
        const data = await DbRequestService.read('userTag', filters);
        return data.map((userTag) => new UserTag(userTag));
    }

    static async getUserTagsByLogin(userLogin) {
        const data = await DbRequestService.read('userTag', { userLogin: `${userLogin}` });
        if (data.length === 0) {
            return null;
        }
        return data.map((userTag) => new UserTag(userTag));
    }

    static async getUserTagByBwid(tagBwid) {
        const data = await DbRequestService.read('userTag', { tagBwid: `${tagBwid}` });
        if (data.length === 0) {
            return null;
        }
        return new UserTag(data[0]);
    }

    static async deleteByBwid(tagBwid) {
        return DbRequestService.delete('userTag', { tagBwid: `${tagBwid}` });
    }

    static async deleteByLogin(userLogin) {
        return DbRequestService.delete('userTag', { userLogin: `${userLogin}` });
    }

    toJSON() {
        return {
            userLogin: this.userLogin,
            tagBwid : this.tagBwid
        }
    }
}