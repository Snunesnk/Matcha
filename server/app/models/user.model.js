import { DbRequestService } from "../services/db-request.service.js";
import { comparePassword } from "../services/password.service.js";
import rand from "rand-token";
import { sendEmail } from "../services/send-mail.service.js";
import { UserChunk } from "./user-chunk.model.js";
import { UserTag } from "./user-tag.model.js";
import { Tag } from "./tag.model.js";
import _ from "lodash";

export class User extends UserChunk {
  constructor(obj = {}) {
    super(obj);

    this.bio = obj.bio;
    this.gender = obj.gender;

    this.verified = obj.verified;
    this.isOnline = obj.isOnline;
    this.lastOnline = obj.lastOnline;

    this.prefMale = obj.prefMale;
    this.prefFemale = obj.prefFemale;
    this.prefEnby = obj.prefEnby;

    this.imgA = obj.imgA;
    this.imgB = obj.imgB;
    this.imgC = obj.imgC;
    this.imgD = obj.imgD;
    this.imgE = obj.imgE;

    this.tags = obj.tags;

    this.latitude = obj.coordinate;
    this.longitude = obj.coordinate;
    this.coordinate = obj.coordinate;
  }

  get coordinate() {
    return this._coordinate;
  }

  set coordinate(coordinate) {
    if (
      coordinate !== null &&
      this._latitude !== undefined &&
      this._longitude !== undefined
    ) {
      this._coordinate = `POINT(${this._latitude} ${this._longitude})`;
    } else {
      this._coordinate = coordinate;
    }
  }

  get latitude() {
    return this._latitude;
  }

  set latitude(coordinate) {
    if (
      _.isObject(coordinate) &&
      coordinate !== null &&
      coordinate.x !== undefined &&
      coordinate.y !== undefined
    ) {
      this._latitude = coordinate.y;
    } else {
      this._latitude = undefined;
    }
  }

  get longitude() {
    return this._longitude;
  }

  set longitude(coordinate) {
    if (
      _.isObject(coordinate) &&
      coordinate !== null &&
      coordinate.x !== undefined &&
      coordinate.y !== undefined
    ) {
      this._longitude = coordinate.x;
    } else {
      this._longitude = undefined;
    }
  }

  get isOnline() {
    return this._isOnline;
  }

  set isOnline(isOnline) {
    if (isOnline === true || isOnline === "true" || isOnline === 1) {
      this._isOnline = true;
      return;
    }
    this._isOnline = false;
  }

  get lastOnline() {
    return this._lastOnline;
  }

  set lastOnline(lastOnline) {
    this._lastOnline = lastOnline;
  }

  get verified() {
    return this._verified;
  }

  set verified(verified) {
    if (verified === true || verified === "true" || verified === 1) {
      this._verified = true;
      return;
    }
    if (verified === false || verified === "false" || verified === 0) {
      this._verified = false;
      return;
    }
  }

  get bio() {
    return this._bio;
  }

  set bio(bio) {
    this._bio = bio;
  }

  get gender() {
    return this._gender;
  }

  set gender(gender) {
    this._gender = gender;
  }

  get prefMale() {
    return this._prefMale;
  }

  set prefMale(prefMale) {
    if (prefMale === true || prefMale === "true" || prefMale === 1) {
      this._prefMale = true;
      return;
    }
    if (prefMale === false || prefMale === "false" || prefMale === 0) {
      this._prefMale = false;
      return;
    }
  }

  get prefFemale() {
    return this._prefFemale;
  }

  set prefFemale(prefFemale) {
    if (prefFemale === true || prefFemale === "true" || prefFemale === 1) {
      this._prefFemale = true;
      return;
    }
    if (prefFemale === false || prefFemale === "false" || prefFemale === 0) {
      this._prefFemale = false;
      return;
    }
  }

  get prefEnby() {
    return this._prefEnby;
  }

  set prefEnby(prefEnby) {
    if (prefEnby === true || prefEnby === "true" || prefEnby === 1) {
      this._prefEnby = true;
      return;
    }
    if (prefEnby === false || prefEnby === "false" || prefEnby === 0) {
      this._prefEnby = false;
      return;
    }
  }

  get imgA() {
    return this._imgA;
  }

  set imgA(imgA) {
    this._imgA = imgA;
  }

  get imgB() {
    return this._imgB;
  }

  set imgB(imgB) {
    this._imgB = imgB;
  }

  get imgC() {
    return this._imgC;
  }

  set imgC(imgC) {
    this._imgC = imgC;
  }

  get imgD() {
    return this._imgD;
  }

  set imgD(imgD) {
    this._imgD = imgD;
  }

  get imgE() {
    return this._imgE;
  }

  set imgE(imgE) {
    this._imgE = imgE;
  }

  get tags() {
    return this._tags;
  }

  set tags(tags) {
    if (tags !== undefined) {
      if (tags === null) {
        this._tags = [];
      } else {
        this._tags = tags.map((tag) => new Tag(tag));
      }
    }
  }

  async passwordMatch(password) {
    return await comparePassword(password, this.password);
  }

  static async sendVerificationMail(user) {
    const token = user.token;
    const login = user.login;
    const email = user.email;
    const verifLink = `${process.env.FRONT_URL}/onboarding/verify/?login=${login}&token=${token}`;
    const message = `Hello ${user.name} ${user.surname}!\n\nPlease verify your email by clicking on the following link:\n${verifLink}\n\nHave a nice day!`;

    try {
      return await sendEmail(email, "Verify your email", message);
    } catch (error) {
      console.log(error);
    }
  }

  static async create(newUser) {
    const data = await DbRequestService.create("user", new UserChunk(newUser));
    if (data.affectedRows === 0) {
      return null;
    }
    return await User.getUserByLogin(newUser.login);
  }

  static async getAllUsers(filters = {}) {
    const data = await DbRequestService.read("user", filters);
    return data.map((user) => new User({ ...user, password: "XXXXX" }));
  }

  static async getUserByLogin(login) {
    const user = await User.getFullUserByLogin(login);
    if (user === null) {
      return null;
    }
    user.password = "XXXXX";
    user.token = "YYYYY";
    return user;
  }

  static async getUserByToken(token) {
    const user = await User.getFullUserByToken(token);
    if (user === null) {
      return null;
    }
    user.password = "XXXXX";
    user.token = "YYYYY";
    return user;
  }

  static async getFullUserByLogin(login) {
    const data = await DbRequestService.read("user", { login: `${login}` });
    if (data.length === 0) {
      return null;
    }
    let tags = [];
    try {
      const userTags = await UserTag.getUserTagsByLogin(login);
      if (_.isArray(userTags)) {
        tags = userTags.map((userTag) => ({ bwid: userTag.tagBwid }));
      }
    } catch (error) {
      console.log(error);
    }
    const user = {
      ...data[0],
      tags,
    };
    return new User(user);
  }

  static async getFullUserByToken(token) {
    const data = await DbRequestService.read("user", { token: `${token}` });
    if (data.length === 0) {
      return null;
    }
    let tags = [];
    try {
      const userTags = await UserTag.getUserTagsByLogin(data.login);
      if (_.isArray(userTags)) {
        tags = userTags.map((userTag) => ({ bwid: userTag.tagBwid }));
      }
    } catch (error) {
      console.log(error);
    }
    const user = {
      ...data[0],
      tags,
    };
    return new User(user);
  }

  static async getAllVerified() {
    return DbRequestService.read("user", { verified: `true` });
  }

  static async updateByLogin(login, user) {
    if (user.email !== undefined) {
      user.verified = false;
      user.token = rand.suid(16);
    }
    const data = await DbRequestService.update(
      "user",
      new User({ ...user, tags: undefined }),
      {
        login: `${login}`,
      }
    );
    if (data.affectedRows === 0) {
      return null;
    }
    try {
      if (_.isArray(user.tags)) {
        await UserTag.deleteByLogin(login);
        user.tags.forEach(async (tag) => {
          await UserTag.create(
            new UserTag({ userLogin: login, tagBwid: tag.bwid })
          );
        });
      }
    } catch (error) {
      console.log(error);
    }
    if (user.email !== undefined) {
      await User.sendVerificationMail(user);
    }
    return await User.getUserByLogin(login);
  }

  static async deleteByLogin(login) {
    const data = DbRequestService.delete("user", { login: `${login}` });
    if (data.affectedRows === 0) {
      return null;
    }
    return true;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      verified: this.verified,
      bio: this.bio,
      gender: this.gender,
      prefMale: this.prefMale,
      prefFemale: this.prefFemale,
      prefEnby: this.prefEnby,
      imgA: this.imgA,
      imgB: this.imgB,
      imgC: this.imgC,
      imgD: this.imgD,
      imgE: this.imgE,
      tags: this.tags,
      isOnline: this.isOnline,
      lastOnline: this.lastOnline,
      coordinate: this.coordinate,
      latitude: this.latitude,
      longitude: this.longitude,
    };
  }
}
