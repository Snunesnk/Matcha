import { Message } from "../models/message.model.js";
import { Notifications } from "../models/notifications.model.js";
import { User } from "../models/user.model.js";
import authenticationService from "../services/authentication.service.js";

export const NOTIFICATION_TYPE = {
  LIKE: "like",
  UNLIKE: "unlike",
  VISIT: "visit",
  MATCH: "match",
  MESSAGE: "message",
  INTERESTED: "interested",
};

let _io = null;

export const initSocket = (io) => {
  _io = io;
  io.use(socketMiddleware);

  io.on("connection", (socket) => {
    const userLogin = socket.decoded.login;

    socket.join(userLogin);

    socket.on("message", (message) => {
      sendMessage(io, { ...message, from: socket.decoded.login });
    });

    socket.on("visit", (visit) => {
      visit.from = socket.decoded.login;
      sendVisit(io, visit);
    });

    socket.on("interested", (payload) => {
      payload.from = socket.decoded.login;
      sendInterest(io, payload);
    });

    socket.on("online-check", async (payload) => {
      const status = isUserConnected(io, payload.login);
      let lastOnline = null;

      if (!status) {
        const user = await User.getUserByLogin(payload.login);
        if (user) {
          lastOnline = user.lastOnline;
        }
      }

      socket.emit("online-status", {
        login: payload.login,
        online: status === true,
        lastOnline: lastOnline,
      });
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit("online-status", {
        login: socket.decoded.login,
        online: false,
        lastOnline: new Date(Date.now()),
      });
      socket.leave(userLogin);
      User.updateByLogin(userLogin, { lastOnline: new Date(Date.now()) });
    });

    socket.broadcast.emit("online-status", {
      login: socket.decoded.login,
      online: true,
    });
  })
    .on("error", function (err) {
      if (err.code == "ENOTFOUND") {
        console.log("[ERROR] No device found at this address!");
        return;
      }

      if (err.code == "ECONNREFUSED") {
        console.log("[ERROR] Connection refused! Please check the IP.");
        return;
      }

      console.log("[CONNECTION] Unexpected error! " + err.message);
    })
    .on("close", function () {
      console.log("[CONNECTION] disconnected!");
    });
};

export const socketMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie;
    if (!token) return;
    const split = token.split("remember_me=");
    if (split.length > 1) {
      const decoded = await authenticationService.verifyToken(split[1]);
      socket.decoded = decoded;
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkIfUserIsOnline = (login) => {
  return isUserConnected(_io, login);
};

function isUserConnected(io, roomName) {
  const allRooms = io.sockets.adapter.rooms;
  const room = allRooms.get(roomName);

  // Check if the room exists and has at least one member
  return room && room.size > 0;
}

const sendInterest = async (io, interest) => {
  const userConnected = isUserConnected(io, interest.to);

  if (userConnected) {
    io.to(interest.to).emit("interested", interest);
  }
  Notifications.create({
    type: NOTIFICATION_TYPE.INTERESTED,
    login: interest.to,
    trigger_login: interest.from,
  });
};

const sendVisit = async (io, visit) => {
  const userConnected = isUserConnected(io, visit.to);

  if (userConnected) {
    io.to(visit.to).emit("visit", visit);
  }
  Notifications.create({
    type: NOTIFICATION_TYPE.VISIT,
    login: visit.to,
    trigger_login: visit.from,
  });
};

const sendMessage = async (io, message) => {
  const newMessage = await Message.create(message);

  if (!message.to || !message.from || !message.message_id) return;

  const userConnected = isUserConnected(io, message.to);

  if (userConnected) {
    io.to(message.to).emit("message", message);
  }
  Notifications.create({
    type: NOTIFICATION_TYPE.MESSAGE,
    login: message.to,
    trigger_login: message.from,
    message_id: newMessage.message_id,
  });
};

export const sendNotification = (login, notificationType, payload = {}) => {
  const userConnected = isUserConnected(_io, login);

  if (userConnected) {
    _io
      .to(login)
      .emit("notification", { type: notificationType, payload: payload });
  }
};
