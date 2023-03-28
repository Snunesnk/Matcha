import bcrypt from "bcryptjs";

export function cryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) resolve(null);
      bcrypt.hash(password, salt, (err, encrypted) => {
        if (err) resolve(null);
        resolve(encrypted);
      });
    });
  });
}

export function comparePassword(plainPass, encrypted) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPass, encrypted, (err, isPasswordMatch) => {
      if (err) resolve(null);
      resolve(isPasswordMatch);
    });
  });
}
