import authenticationService from "../services/authentication.service.js";

const socketList = [];

export const initSocket = (io) => {
  io.use(socketMiddleware);

  io.on("connection", (socket) => {
    socketList.push({ clientSocket: socket, user: socket.decoded });
  })
    .on("error", function (err) {
      if (err.code == "ENOTFOUND") {
        console.log("[ERROR] No device found at this address!");
        // device.clientSocket.destroy();
        // socketList.splice(socketList.indexOf(device), 1);
        return;
      }

      if (err.code == "ECONNREFUSED") {
        console.log("[ERROR] Connection refused! Please check the IP.");
        // device.clientSocket.destroy();
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
  const user = socketList.find((user) => user.user.login === login);
  return user ? true : false;
};
