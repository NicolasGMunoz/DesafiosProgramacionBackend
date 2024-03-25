import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export {
    __dirname
}


export const createHash = (password) => {
    const salt = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    return salt
  }

export const isValidPassowrd = (plainPassword, hashedPassword) => {
    const result = bcrypt.compareSync(plainPassword, hashedPassword)
    return result
}