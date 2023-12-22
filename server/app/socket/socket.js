import authenticationService from "../services/authentication.service.js";

const socketList = [];

export const initSocket = (io) => {
  io.use(socketMiddleware);

  io.on("connection", (socket) => {
    socketList.push({ socketId: socket.id, user: socket.decoded });
  });
};

export const socketMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie;
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
