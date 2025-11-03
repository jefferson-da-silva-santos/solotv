import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { schemaUserLogin } from "../../utils/validations.js";
import AbstractService from "../abstract.service.js";
import { API_MESSAGES } from "../../utils/consts.js";
import logger from "../../utils/logger.js";
import { ApiError } from "../../utils/error.js";

export class UserLoginService extends AbstractService {
  constructor(repository) {
    super(repository);
  }

  async execute(req) {
    try {
      const value = req.body;

      this.validateInputs(value, schemaUserLogin);

      const { email, password } = value;

      const user = await this.findUserByEmail(email);

      this.comparePasswords(password, user.password_hash);

      const token = this.generateToken(user.id, user.role);

      const cleanUser = this.formatUser(user);

      logger.info(API_MESSAGES.USER_LOGGED_IN_SUCCESSFULLY);

      return {
        token,
        user: cleanUser
      };
    } catch (error) {
      throw error;
    }
  }

  formatUser(user) {
    const cleanUser = user.get({ plain: true });
    delete cleanUser.password_hash;
    return cleanUser;
  }

  comparePasswords(password1, password2) {
    const validPassword = bcrypt.compareSync(password1, password2);
    if (!validPassword) {
      throw new ApiError(401, API_MESSAGES.INVALID_CREDENTIALS);
    }
    return true;
  }

  async findUserByEmail(email) {
    const user = await this.repository.getOne({ email });
    if (!user) {
      throw new ApiError(401, API_MESSAGES.INVALID_CREDENTIALS);
    }
    return user;
  }

  generateToken(id, role) {
    const payload = { sub: id, role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "10d",
      issuer: "your_project", // Replace with your project name
      audience: "your_project", // Replace with your project name
    });

    if (!token) {
      throw new ApiError(500, API_MESSAGES.TOKEN_NOT_GENERATED);
    }
    return token;
  }
}
