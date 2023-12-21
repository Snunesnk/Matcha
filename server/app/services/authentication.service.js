import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || ",z$F!Wx-NB)ZROO;UX|+h~[0}V>iyKme";
const JWT_EXPIRATION = "1h";
const JWT_REMEMBER_ME_EXPIRATION = "7d";

class AuthenticationService {
  async generateToken(user, remember_me = false) {
    return jwt.sign({ login: user.login, email: user.email }, JWT_SECRET, {
      expiresIn: remember_me ? JWT_REMEMBER_ME_EXPIRATION : JWT_EXPIRATION,
    });
  }

  // Verify the JWT
  verifyToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if (err) {
          reject(err);
        } else {
          resolve(decodedToken);
        }
      });
    });
  }

  // Middleware to protect routes
  authenticateTokenMiddleware(req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided." });
    }

    this.verifyToken(token)
      .then((decoded) => {
        req.user = decoded;
        next();
      })
      .catch((err) => {
        res.status(403).json({ message: "Invalid token.", error: err });
      });
  }
}

export default new AuthenticationService();
