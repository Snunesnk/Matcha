import { genSalt, hash, compare } from 'bcrypt';

export function cryptPassword(password) {
    return new Promise((resolve, reject) => {
        genSalt(10, (err, salt) => {
            if (err)
                resolve(null);
            hash(password, salt, (err, encrypted) => {
                if (err)
                    resolve(null);
                resolve(encrypted);
            });
        });
    });
}

export function comparePassword(plainPass, encrypted) {
    return new Promise((resolve, reject) => {
        compare(plainPass, encrypted, (err, isPasswordMatch) => {
            if (err)
                resolve(null);
            resolve(isPasswordMatch);
        });
    });
}