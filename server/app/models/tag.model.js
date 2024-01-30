import { DbRequestService } from "../services/db-request.service.js";

export class Tag {
  constructor(obj = {}) {
    this.bwid = obj.bwid;
  }

  get bwid() {
    return this._bwid;
  }

  set bwid(bwid) {
    if (bwid) this._bwid = bwid.trim().substring(0, 100);
  }

  static async create(newTag) {
    const data = await DbRequestService.create("tag", newTag);
    if (data.affectedRows === 0) {
      return null;
    }
    return await Tag.getTagByBwid(newTag.bwid);
  }

  static async getAllTags(filters = {}) {
    const data = await DbRequestService.read("tag", filters);
    return data.map((tag) => new Tag(tag));
  }

  static async getTagByBwid(bwid) {
    const data = await DbRequestService.read("tag", { bwid: `${bwid}` });
    if (data.length === 0) {
      return null;
    }
    return new Tag(data[0]);
  }

  static async deleteById(bwid) {
    return DbRequestService.delete("tag", { bwid: `${bwid}` });
  }

  toJSON() {
    return {
      bwid: this.bwid,
    };
  }
}
