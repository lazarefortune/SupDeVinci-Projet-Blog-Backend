import { pbkdf2Sync, randomBytes } from "crypto";
import config from "../../config/config.js";

const { keylen, pepper, iteration, digest } = config.security.password;

export const hashPassword = (
  password,
  salt = randomBytes(128).toString("hex")
) => [
  pbkdf2Sync(password, salt + pepper, iteration, keylen, digest).toString(
    "hex"
  ),
  salt,
];

export const comparePassword = (password, passwordHash, passwordSalt) => {
  const [passwordHash2, passwordSalt2] = hashPassword(password, passwordSalt);
  return passwordHash === passwordHash2;
};

// const comparePassword = (password, passwordHash, salt) =>
//   pbkdf2Sync(password, salt + pepper, iteration, keylen, digest).toString(
//     "hex"
//   ) === passwordHash;
