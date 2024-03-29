import { DbRequestService } from "../services/db-request.service.js";
import { comparePassword } from "../services/password.service.js";
import { sendEmail } from "../services/send-mail.service.js";
import { UserChunk } from "./user-chunk.model.js";
import { UserTag } from "./user-tag.model.js";
import { Tag } from "./tag.model.js";
import bcrypt from "bcrypt";
import _ from "lodash";

export class User extends UserChunk {
  constructor(obj = {}) {
    super(obj);

    this.bio = obj.bio;
    this.gender = obj.gender;

    this.verified = obj.verified;
    this.onboarded = obj.onboarded;
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
    this.distance = obj.distance;

    this.rating = obj.rating;

    this.userLiked = obj.userLiked;
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
      this._coordinate = `POINT(${this._longitude} ${this._latitude})`;
    } else if (
      coordinate &&
      coordinate.x !== undefined &&
      coordinate.y !== undefined
    ) {
      this._coordinate = `POINT(${coordinate.x} ${coordinate.y})`;
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

  get onboarded() {
    return this._onboarded;
  }

  set onboarded(onboarded) {
    if (onboarded === true || onboarded === "true" || onboarded === 1) {
      this._onboarded = true;
      return;
    }
    if (onboarded === false || onboarded === "false" || onboarded === 0) {
      this._onboarded = false;
    }
  }

  get bio() {
    return this._bio;
  }

  set bio(bio) {
    // if bio is more than 100 characters, cut it
    if (bio && bio.length > 100) {
      bio = bio.substring(0, 100);
    }
    this._bio = bio;
  }

  get gender() {
    return this._gender;
  }

  set gender(gender) {
    if (gender) this._gender = gender.trim().substring(0, 3);
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
    if (imgA) this._imgA = imgA.trim().substring(0, 200);
  }

  get imgB() {
    return this._imgB;
  }

  set imgB(imgB) {
    if (imgB) this._imgB = imgB.trim().substring(0, 200);
  }

  get imgC() {
    return this._imgC;
  }

  set imgC(imgC) {
    if (imgC) this._imgC = imgC.trim().substring(0, 200);
  }

  get imgD() {
    return this._imgD;
  }

  set imgD(imgD) {
    if (imgD) this._imgD = imgD.trim().substring(0, 200);
  }

  get imgE() {
    return this._imgE;
  }

  set imgE(imgE) {
    if (imgE) this._imgE = imgE.trim().substring(0, 200);
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

  get distance() {
    return this._distance;
  }

  set distance(distance) {
    this._distance = distance;
  }

  get rating() {
    return this._rating;
  }

  set rating(rating) {
    this._rating = rating;
  }

  get userLiked() {
    return this._userLiked;
  }

  set userLiked(userLiked) {
    this._userLiked = userLiked;
  }

  async passwordMatch(password) {
    return await comparePassword(password, this.password);
  }

  static async sendVerificationMail(user, token) {
    let hashedToken = bcrypt.hashSync(token, 10);
    while (hashedToken.includes("/")) {
      console.log("hashing again");
      hashedToken = bcrypt.hashSync(token, 10);
    }
    const login = user.login;
    const email = user.email;
    const verifLink = `${process.env.FRONT_URL}/verify/?login=${login}&token=${hashedToken}`;
    const message = `Hello ${user.surname}!\n\nPlease verify your email by clicking the following link:\n${verifLink}\n\nHave a nice day!`;

    try {
      return await sendEmail(email, "Verify your email", message);
    } catch (error) {
      console.log(error);
    }
  }

  static async sendResetPasswordMail(user, token) {
    let hashedToken = bcrypt.hashSync(token, 10);
    while (hashedToken.includes("/")) {
      console.log("hashing again");
      hashedToken = bcrypt.hashSync(token, 10);
    }
    const login = user.login;
    const email = user.email;
    const resetLink = `${process.env.FRONT_URL}/password-reset/?login=${login}&token=${hashedToken}`;
    const message = `Hello ${user.surname}!\n\nPlease reset your password by clicking the following link:\n${resetLink}\n\nHave a nice day!`;

    try {
      return await sendEmail(email, "Reset your password", message);
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

  static async getUserByMail(mail) {
    const data = await DbRequestService.read("user", { email: `${mail}` });

    if (data.length === 0) {
      return null;
    }

    return new User(data[0]);
  }

  static async getChunkUserByLogin(login) {
    const data = await DbRequestService.read("user", { login: `${login}` });
    if (data.length === 0) {
      return null;
    }

    return new User(data[0]);
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
          await UserTag.create(new UserTag({ userLogin: login, tagBwid: tag }));
        });
      }
    } catch (error) {
      console.log(error);
    }
    return User.getUserByLogin(login);
  }

  static async verifyLogin(login, token) {
    const data = await DbRequestService.read("user", { login: `${login}` });

    if (data === null) {
      return -1;
    }

    const userToken = data[0].token.split("_mail_timestamp_")[0];
    const res = bcrypt.compareSync(userToken, token);

    if (res === false) return -1;
    return 1;
  }

  static async deleteByLogin(login) {
    const data = DbRequestService.delete("user", { login: `${login}` });
    if (data.affectedRows === 0) {
      return null;
    }
    return true;
  }

  static async getMatchingProfiles(matchingParameters, userFilters) {
    const data = await DbRequestService.getMatchList(
      matchingParameters,
      userFilters
    );

    if (!data) return null;

    return data;
  }

  static async checkBiDirectionnalMatch(likee, liker) {
    const data = await DbRequestService.checkForBiDirectionMatch(likee, liker);

    if (!data) return null;

    return data[0];
  }

  static async count() {
    return DbRequestService.countAllUsers();
  }

  toJSON() {
    return {
      ...super.toJSON(),
      verified: this.verified,
      onboarded: this.onboarded,
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
      lastOnline: this.lastOnline,
      coordinate: this.coordinate,
      latitude: this.latitude,
      longitude: this.longitude,
      distance: this.distance,
      rating: this.rating,
      userLiked: this.userLiked,
    };
  }
}
