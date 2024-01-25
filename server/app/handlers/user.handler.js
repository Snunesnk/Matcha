import { User } from "../models/user.model.js";
import { cryptPassword } from "../services/password.service.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import authenticationService from "../services/authentication.service.js";
import { getIpAddress, getIpInfo } from "../services/location.service.js";
import { UserSetting } from "../models/user-settings.model.js";
import { UserTag } from "../models/user-tag.model.js";
import { Tag } from "../models/tag.model.js";

export default class {
  static async login(req, res) {
    const { login, password } = req.body;
    let rememberMe = req.body.rememberMe;

    if (!login || !password) {
      res.status(400).send({
        message: "MISSING_DATA",
      });
      return;
    }

    if (!rememberMe) rememberMe = false;

    try {
      const user = await User.getFullUserByLogin(login);
      if (user === null) {
        res.status(404).send({
          message: "WRONG_CREDENTIALS",
        });
        return;
      }

      const isPasswordMatch = await user.passwordMatch(password);
      if (!isPasswordMatch) {
        res.status(404).send({
          message: "WRONG_CREDENTIALS",
        });
        return;
      }

      if (user.verified !== true) {
        res.status(401).send({
          message: "EMAIL_NOT_VERIFIED",
          email: user._email,
          name: user._name,
          login: user._login,
        });
        return;
      }

      try {
        getIpAddress(req).then(async (ip) => {
          const loc = await getIpInfo(ip);
          if (loc) {
            const userLoc = {
              coordinate: {
                y: loc.lat,
                x: loc.lon,
              },
            };
            User.updateByLogin(login, userLoc);
          }
        });
      } catch (err) {
        console.log("error while getting ip address", err);
      }

      // Create remember-me cookie
      const jwtToken = await authenticationService.generateToken(
        user,
        rememberMe
      );
      const cookieOptions = {
        httpOnly: true, // Cookie inaccessible to browser's JavaScript
        maxAge: rememberMe
          ? 1000 * 60 * 60 * 24 * 7 // 7 days
          : 1000 * 60 * 15, // 15 minutes
        path: "/",
        sameSite: "strict",
      };
      res.cookie("remember_me", jwtToken, cookieOptions);
      res.status(200).send({
        message: "LOG_IN_SUCCESS",
        email: user.email,
        name: user.name,
        login: user.login,
        imgA: user.imgA,
      });
    } catch (error) {
      res.status(500).send({
        message: "COULD_NOT_LOGIN",
      });
      console.log(error);
    }
  }

  // Send a verification mail to the User
  static async resendVerificationMail(req, res) {
    const email = req.params.email;
    try {
      const user = await User.getUserByMail(email);
      if (user === null || user.verified === true) {
        res.status(403).send({
          message: "NOT_ALLOWED",
        });
        return;
      }

      // Check if previous mail was sent less than 5 minutes ago
      if (user.token.includes("_mail_timestamp_")) {
        const timestamp = user.token.split("_mail_timestamp_")[1];
        if (Date.now() - timestamp < 5 * 60 * 1000) {
          let cooldown = 5 * 60 * 1000 - (Date.now() - timestamp);
          cooldown = Math.floor(cooldown / 1000 / 60);
          cooldown = cooldown + " minute" + (cooldown > 1 ? "s" : "");
          res.status(400).send({
            message: "MAIL_ALREADY_SENT",
            cooldown: cooldown,
          });
          return;
        }
      }

      const userToken = crypto.randomBytes(64).toString("base64url");
      user.token = userToken + "_mail_timestamp_" + Date.now();
      await User.updateByLogin(user._login, { token: user.token });

      const result = await User.sendVerificationMail(user, userToken);
      if (result === true) {
        res.status(200).send({
          message: "Verification mail sent successfully.",
        });
        return;
      }
      res.status(500).send({
        message: "COULD_NOT_SEND_EMAIL",
      });
    } catch (error) {
      res.status(500).send({
        message:
          error.message || "Error occurred while sending verification mail.",
      });
    }
  }

  // Create and Save a new User
  static async create(req, res) {
    // Validate request
    if (
      !req.body ||
      !req.body.login ||
      !req.body.password ||
      !req.body.email ||
      !req.body.name ||
      !req.body.surname ||
      !req.body.dateOfBirth
    ) {
      res.status(400).send({
        message: "MISSING_DATA",
      });
      return;
    }

    // TODO - Validate birthdate
    if (isNaN(new Date(req.body.dateOfBirth))) {
      res.status(400).send({
        message: "INVALID_DATE",
      });
      return;
    }

    const ensure18 = (date) => {
      var today = new Date();
      var birthDate = new Date(date);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 18;
    };
    if (!ensure18(req.body.dateOfBirth)) {
      res.status(400).send({
        message: "TOO_YOUNG",
      });
      return;
    }

    const ensureUnique = async (login, email) => {
      const user = await User.getUserByLogin(login);
      if (user !== null) {
        res.status(400).send({
          message: "LOGIN_ALREADY_USED",
        });
        return false;
      }

      const user2 = await User.getUserByMail(email);
      if (user2 !== null) {
        res.status(400).send({
          message: "EMAIL_ALREADY_USED",
        });
        return false;
      }

      return true;
    };
    if (!(await ensureUnique(req.body.login, req.body.email))) {
      return;
    }

    // TODO - test password strength
    const password = await cryptPassword(req.body.password);
    if (password === null) {
      res.status(500).send({
        message: "PASSWORD_ENCRYPTION_ERROR",
      });
      return;
    }

    // Create a User
    const user = {
      login: req.body.login,
      password: password,
      email: req.body.email,
      name: req.body.name,
      surname: req.body.surname,
      dateOfBirth: req.body.dateOfBirth,
    };

    try {
      // Save User in the database
      const userToken = crypto.randomBytes(64).toString("base64url");
      user.token = userToken + "_mail_timestamp_" + Date.now();
      const result = await User.create(user);
      if (result !== null) {
        User.sendVerificationMail(result, userToken);

        res.status(200).send(result);
        return;
      }
      res.status(500).send({
        message: "COULD_NOT_CREATE",
      });
    } catch (error) {
      res.status(500).send({
        message: error.message || "Error occurred while creating the User.",
      });
    }
  }

  // Verify User's mail
  static async verifyUser(req, res) {
    const login = req.params.login;
    const token = req.params.token;

    if (!login || !token) {
      res.status(400).send({
        message: "MISSING_DATA",
      });

      return;
    }

    try {
      let result = await User.verifyLogin(login, token);

      if (result === -1) {
        res.status(401).send({
          message: "WRONG_TOKEN",
        });
        return;
      }

      const rememberMeToken = crypto.randomBytes(64).toString("hex");
      const hashedToken = bcrypt.hashSync(rememberMeToken, 10);

      result = await User.updateByLogin(login, {
        verified: true,
        token: hashedToken,
      });
      if (result === null) {
        res.status(500).send({
          message: "COULD_NOT_VERIFY",
        });
      }

      // Create default userSettings
      result = await UserSetting.create({ userLogin: login });
      if (result === null) {
        res.status(500).send({
          message: "COULLD_NOT_CREATE_USER_SETTINGS",
        });
      }

      // const res
      res.status(200).send({
        message: "User verified successfully.",
      });
    } catch (error) {
      res.status(500).send({
        message: error.message || "Error occurred while verifying the User.",
      });
    }
  }

  // Retrieve all Users from the database (with condition).
  static getAllUsers = async (req, res) => {
    const filters = req.body.filters || {};

    try {
      const data = await User.getAllUsers(filters);
      res.send(data);
    } catch (error) {
      res.status(500).send({
        message: error.message || "Some error occurred while retrieving users.",
      });
    }
  };

  static getCoordinates = (pointString) => {
    const matches = pointString.match(/POINT\(([^ ]+) ([^)]+)\)/);
    return {
      longitude: parseFloat(matches[1]),
      latitude: parseFloat(matches[2]),
    };
  };

  static calculateDistance = (point1, point2) => {
    const earthRadiusKm = 6371;

    const dLat = this.degreesToRadians(point2.latitude - point1.latitude);
    const dLon = this.degreesToRadians(point2.longitude - point1.longitude);

    const lat1 = this.degreesToRadians(point1.latitude);
    const lat2 = this.degreesToRadians(point2.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  };

  static degreesToRadians = (degrees) => {
    return (degrees * Math.PI) / 180;
  };

  // Find a single User with a login
  static getUserByLogin = async (req, res) => {
    const login = req.params.login;

    if (!login) {
      res.status(400).send({
        message: `Missing login`,
      });
      return;
    }

    try {
      const data = await User.getUserByLogin(login);
      const targetCoordinates = this.getCoordinates(data.coordinate);
      const userCoordinates = this.getCoordinates(req.decodedUser._coordinate);
      data.distance = this.calculateDistance(
        targetCoordinates,
        userCoordinates
      );

      if (data === null) {
        res.status(404).send({
          message: `Could not find User with login ${req.params.login}.`,
        });
        return;
      }
      res.send(data);
    } catch (error) {
      res.status(500).send({
        message: `Error retrieving User with login: ${login}`,
      });
    }
  };

  // find all published Users
  static getAllVerified = async (req, res) => {
    req.body.filters = {
      ...req.body.filters,
      verified: true,
    };
    return await this.getAllUsers(req, res);
  };

  // Update a User identified by the login in the request
  static update = async (req, res) => {
    const user = req.body.user || {};
    const login = req.decodedUser._login;

    // check for missing data
    if (!login || Object.keys(user).length === 0) {
      res.status(400).send({
        message: `Missing data`,
      });
      return;
    }
    if (!user.gender || !user.bio || !user.tags || !user.preferences) {
      res.status(400).send({
        message: `Missing data`,
      });
      return;
    }
    if (
      user.gender.length === 0 ||
      user.bio.length === 0 ||
      user.tags.length === 0
    ) {
      res.status(400).send({
        message: `Missing data`,
      });
      return;
    }
    if (
      !user.preferences.prefMale &&
      !user.preferences.prefFemale &&
      !user.preferences.prefEnby
    ) {
      res.status(400).send({
        message: `Missing data`,
      });
      return;
    }

    if (user.preferences) {
      user.prefMale = user.preferences.prefMale;
      user.prefFemale = user.preferences.prefFemale;
      user.prefEnby = user.preferences.prefEnby;
    }

    user.onboarded = true;

    try {
      const data = await User.updateByLogin(login, user);
      // I don't know why tags are not retreived...
      const tags = await UserTag.getUserTagsByLogin(login);
      data.tags = tags.map((tag) => new Tag({ bwid: tag.tagBwid }));
      if (data === null) {
        // not found User with the login
        res.status(404).send({
          message: `Could not find User with login ${login}.`,
        });
        return;
      }
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send({
        error: { ...error },
        message: `Error updating User with login: ${login}`,
      });
    }
  };

  // Delete a User with the specified login in the request
  static delete = async (req, res) => {
    const login = req.params.login;

    if (!login) {
      res.status(400).send({
        message: `Missing login`,
      });
      return;
    }

    try {
      const data = await User.deleteByLogin(login);
      if (data === null) {
        res.status(404).send({
          message: `Could not find User with login ${login}.`,
        });
        return;
      }
      res.status(200).send({ message: "User was deleted successfully!" });
    } catch (error) {
      res.status(500).send({
        message: `Could not delete User with login ${login}`,
      });
    }
  };

  static currentUser = async (req, res) => {
    const user = req.decodedUser;

    if (!user) {
      res.status(200).send({
        user: null,
      });
    } else {
      res.status(200).send({
        user: user,
      });
    }
  };

  static sendResetPasswordMail = async (req, res) => {
    const email = req.params.email;

    if (!email) {
      res.status(400).send({
        message: `Missing mail`,
      });
      return;
    }

    try {
      const user = await User.getUserByMail(email);
      if (user === null) {
        res.status(404).send({
          message: "USER_NOT_FOUND",
        });
        return;
      }
      if (user.verified !== true) {
        res.status(401).send({
          message: "EMAIL_NOT_VERIFIED",
        });
        return;
      }

      // Check if previous mail was sent less than 15 minutes ago
      if (user?.token.includes("_mail_timestamp_")) {
        const timestamp = user.token.split("_mail_timestamp_")[1];
        if (Date.now() - timestamp < 15 * 60 * 1000) {
          res.status(400).send({
            message: "MAIL_ALREADY_SENT",
          });
          return;
        }
      }

      const userToken = crypto.randomBytes(64).toString("base64url");
      user.token = userToken + "_mail_timestamp_" + Date.now();
      await User.updateByLogin(user.login, { token: user.token });

      const result = await User.sendResetPasswordMail(user, userToken);
      if (result === true) {
        res.status(200).send({
          message: "Reset password mail sent successfully.",
        });
        return;
      }
      res.status(500).send({
        message: "COULD_NOT_SEND_EMAIL",
      });
    } catch (error) {
      res.status(500).send({
        message:
          error.message || "Error occurred while sending reset password mail.",
      });
    }
  };

  static resetPassword = async (req, res) => {
    const { login, token } = req.body;
    let password = req.body.hashedPassword;

    if (!login || !token || !password) {
      res.status(400).send({
        message: `Missing data`,
      });
      return;
    }

    try {
      const user = await User.getChunkUserByLogin(login);
      if (user === null) {
        res.status(404).send({
          message: "USER_NOT_FOUND",
        });
        return;
      }

      const userToken = user.token.split("_mail_timestamp_")[0];
      if (!bcrypt.compareSync(userToken, token)) {
        console.log("correct token", userToken);
        console.log("received token", token);
        res.status(401).send({
          message: "WRONG_TOKEN",
        });
        return;
      }

      // TODO - test password strength
      password = await cryptPassword(password);
      if (password === null) {
        res.status(500).send({
          message: "PASSWORD_ENCRYPTION_ERROR",
        });
        return;
      }

      user.password = password;
      user.token = crypto.randomBytes(64).toString("base64url");
      user.token += "_mail_timestamp_" + Date.now();
      await User.updateByLogin(login, user);

      res.status(200).send({
        message: "SUCCESS",
      });
      return;
    } catch (error) {
      res.status(500).send({
        message: error.message || "Error occurred while resetting password.",
      });
    }
  };

  static updateLocation = async (req, res) => {
    const { lat, lng } = req.body;
    const login = req.decodedUser._login;

    if (!lat || !lng) {
      res.status(400).send({
        message: "MISSING_DATA",
      });
    }

    const user = {
      coordinate: {
        y: lat,
        x: lng,
      },
    };

    const data = await User.updateByLogin(login, user);
    if (!data) {
      res.status(404).send({
        message: "USER_NOT_FOUND",
      });
    }

    res.status(200).send("Location updated");
  };

  static parseParams = (params) => {
    const defaultParams = {
      sort: "Popularity",
      sortDirection: "DESC",
    };
    const SORT_VALUES = ["Age", "Distance", "Popularity", "Tags"];
    const SORT_DIRECTION_VALUES = ["Asc.", "Desc."];
    const AGE_VALUES = ["all", "18-25", "25-35", "35-45", "45-55", "55+"];
    const DISTANCE_VALUES = ["all", "<5km", "<10km", "<25km", "<50km"];
    const POPULARITY_VALUES = ["all", "100", ">80", ">60", ">40", ">20"];

    if (params.sort) {
      switch (SORT_VALUES.indexOf(params.sort)) {
        case 0:
          defaultParams.sort = "Age";
          break;
        case 1:
          defaultParams.sort = "Distance";
          break;
        case 2:
          defaultParams.sort = "Popularity";
          break;
        case 3:
          defaultParams.sort = "Tags";
          break;
        default:
          break;
      }
    }

    if (params.sortDirection) {
      switch (SORT_DIRECTION_VALUES.indexOf(params.sortDirection)) {
        case 0:
          defaultParams.sortDirection = "ASC";
          break;
        case 1:
          defaultParams.sortDirection = "DESC";
          break;
        default:
          break;
      }
    }

    if (params.age) {
      switch (AGE_VALUES.indexOf(params.age)) {
        case 0:
          defaultParams.ageMin = 18;
          defaultParams.ageMax = 55;
          break;
        case 1:
          defaultParams.ageMin = 18;
          defaultParams.ageMax = 25;
          break;
        case 2:
          defaultParams.ageMin = 25;
          defaultParams.ageMax = 35;
          break;
        case 3:
          defaultParams.ageMin = 35;
          defaultParams.ageMax = 45;
          break;
        case 4:
          defaultParams.ageMin = 45;
          defaultParams.ageMax = 55;
          break;
        case 5:
          defaultParams.ageMin = 55;
          defaultParams.ageMax = 55;
          break;
        default:
          break;
      }
    }

    if (params.location) {
      switch (DISTANCE_VALUES.indexOf(params.location)) {
        case 0:
          defaultParams.distMax = 100;
          break;
        case 1:
          defaultParams.distMax = 5;
          break;
        case 2:
          defaultParams.distMax = 10;
          break;
        case 3:
          defaultParams.distMax = 25;
          break;
        case 4:
          defaultParams.distMax = 50;
          break;
        default:
          break;
      }
    }

    if (params.popularity) {
      switch (POPULARITY_VALUES.indexOf(params.popularity)) {
        case 0:
          defaultParams.fameMin = 0;
          break;
        case 1:
          defaultParams.fameMin = 100;
          break;
        case 2:
          defaultParams.fameMin = 80;
          break;
        case 3:
          defaultParams.fameMin = 60;
          break;
        case 4:
          defaultParams.fameMin = 40;
          break;
        case 5:
          defaultParams.fameMin = 20;
          break;
        default:
          break;
      }
    }

    if (params.tags && params.tags.length > 0) {
      defaultParams.tags = params.tags;
    } else defaultParams.tags = [];

    return defaultParams;
  };

  static getMatchingProfile = async (req, res) => {
    const login = req.decodedUser._login;
    const params = this.parseParams(req.body);

    try {
      const user = await User.getUserByLogin(login);
      if (!user) {
        res.status(404).send({ message: "USER_NOT_FOUND" });
        return;
      }

      const matchingParameters = {
        login,
        enby: user.prefEnby,
        male: user.prefMale,
        female: user.prefFemale,
      };

      matchingParameters.tags =
        await UserSetting.getUserSettingsTagsAsStringByLogin(login);

      const results = await User.getMatchingProfiles(
        matchingParameters,
        params
      );
      if (!results) {
        res.status(500).send({ message: "CANT_GET_MATCHS" });
        return;
      }
      res.status(200).send({ results });
    } catch (err) {
      console.log(err);
    }
  };

  static logout = async (req, res) => {
    const login = req.decodedUser._login;

    if (!login) {
      res.status(400).send({
        message: "MISSING_DATA",
      });
    }

    const user = {
      token: crypto.randomBytes(64).toString("base64url"),
    };

    const data = await User.updateByLogin(login, user);
    if (!data) {
      res.status(404).send({
        message: "USER_NOT_FOUND",
      });
    }

    res.clearCookie("remember_me").status(200).send("Logout successful");
  };
}
