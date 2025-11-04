import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { schemaUserLogin } from "../../utils/validations.js";
import { API_MESSAGES } from "../../utils/constant.js";
import logger from "../../utils/logger.js";
import { ApiError } from "../../utils/error.js";
import AbstractService from "../AbstractService.js";

/**
 * Service responsible for handling user authentication.
 * 
 * Extends AbstractService and manages the process of validating credentials,
 * checking user existence, verifying passwords, and generating JWT tokens.
 *
 * @class UserLoginService
 * @extends AbstractService
 */
export class UserLoginService extends AbstractService {
  /**
   * Creates an instance of UserLoginService.
   *
   * @param {import('../../repositories/AbstractRepository.js').default} repository - Repository instance used for user lookups.
   */
  constructor(repository) {
    super(repository);
  }

  /**
   * Executes the user login operation.
   * 
   * Validates input, authenticates user credentials, generates a JWT,
   * and returns the authenticated user without sensitive data.
   *
   * @async
   * @param {import('express').Request} req - Express request object.
   * @returns {Promise<{token: string, user: Object}>} Authenticated user data and token.
   * @throws {ApiError} If credentials are invalid or token generation fails.
   */
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

  /**
   * Removes sensitive fields from the user object.
   *
   * @param {Object} user - Sequelize user instance.
   * @returns {Object} Clean user object without password hash.
   */
  formatUser(user) {
    const cleanUser = user.get({ plain: true });
    delete cleanUser.password_hash;
    return cleanUser;
  }

  /**
   * Compares plain-text and hashed passwords.
   *
   * @param {string} password1 - Plain-text password provided by the user.
   * @param {string} password2 - Hashed password from the database.
   * @returns {boolean} True if passwords match.
   * @throws {ApiError} If passwords do not match.
   */
  comparePasswords(password1, password2) {
    const validPassword = bcrypt.compareSync(password1, password2);
    if (!validPassword) {
      throw new ApiError(401, API_MESSAGES.INVALID_CREDENTIALS);
    }
    return true;
  }

  /**
   * Finds a user by email in the repository.
   *
   * @async
   * @param {string} email - User email to look up.
   * @returns {Promise<Object>} User record if found.
   * @throws {ApiError} If no user is found.
   */
  async findUserByEmail(email) {
    const user = await this.repository.getOne({ email });
    if (!user) {
      throw new ApiError(401, API_MESSAGES.INVALID_CREDENTIALS);
    }
    return user;
  }

  /**
   * Generates a JWT token for the authenticated user.
   *
   * @param {number|string} id - User ID.
   * @param {string} role - User role.
   * @returns {string} Generated JWT token.
   * @throws {ApiError} If token generation fails.
   */
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

/**
 * Continue your code below this line.
 * 
 * Add new authentication-related services or extend functionality.
 * Example:
 * 
 * export class RefreshTokenService extends AbstractService {
 *   async execute(req) {
 *     const { token } = req.body;
 *     // Implement token refresh logic here
 *   }
 * }
 */
