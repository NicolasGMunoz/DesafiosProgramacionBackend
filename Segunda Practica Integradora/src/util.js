import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import bcrypt from "bcrypt"
import { PRIVATE_KEY_JWT } from "./config/constants.js";
import jwt from "jsonwebtoken"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export {
    __dirname
}

export const createHash = (password) => {
    const salt = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    return salt
  }

  export const isValidPassword = (plainPassword, hashedPassword) => {
    const result = bcrypt.compareSync(plainPassword, hashedPassword)
    return result
  }
  
  export const generateToken = (user) => {
      const token = jwt.sign({ user }, PRIVATE_KEY_JWT, { expiresIn: '24h'});
    return token
  };
  
  export const authorization = (role) => {
    return async (req, res, next) => {
      if(req.user.role !== role) return res.status(403).send({ status: "error", message: "not permissions" })
      next()
    }
  }