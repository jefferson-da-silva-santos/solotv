import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserLoginService } from "../../../src/services/user/UserLoginService.js";
import { ApiError } from "../../../src/utils/error.js";
import { API_MESSAGES } from "../../../src/utils/constant.js";
import logger from "../../../src/utils/logger.js";

// Mock external dependencies
jest.mock("jsonwebtoken");
jest.mock("bcrypt");
jest.mock("../../src/utils/logger.js");

describe("UserLoginService", () => {
  let repository;
  let service;

  beforeEach(() => {
    repository = {
      getOne: jest.fn(),
    };
    service = new UserLoginService(repository);

    process.env.JWT_SECRET = "test_secret";
    jest.clearAllMocks();
  });

  describe("findUserByEmail", () => {
    it("should return the user if found", async () => {
      const fakeUser = { id: 1, email: "test@test.com" };
      repository.getOne.mockResolvedValue(fakeUser);

      const result = await service.findUserByEmail("test@test.com");

      expect(result).toBe(fakeUser);
      expect(repository.getOne).toHaveBeenCalledWith({ email: "test@test.com" });
    });

    it("should throw an error if user is not found", async () => {
      repository.getOne.mockResolvedValue(null);

      await expect(service.findUserByEmail("notfound@test.com"))
        .rejects
        .toThrow(new ApiError(401, API_MESSAGES.INVALID_CREDENTIALS));
    });
  });

  describe("comparePasswords", () => {
    it("should return true if passwords match", () => {
      bcrypt.compareSync.mockReturnValue(true);
      const result = service.comparePasswords("123456", "fake_hash");
      expect(result).toBe(true);
    });

    it("should throw an error if passwords do not match", () => {
      bcrypt.compareSync.mockReturnValue(false);
      expect(() => service.comparePasswords("wrong", "fake_hash"))
        .toThrow(new ApiError(401, API_MESSAGES.INVALID_CREDENTIALS));
    });
  });

  describe("generateToken", () => {
    it("should generate a valid JWT token", () => {
      jwt.sign.mockReturnValue("fake_token");

      const token = service.generateToken(1, "admin");

      expect(token).toBe("fake_token");
      expect(jwt.sign).toHaveBeenCalledWith(
        { sub: 1, role: "admin" },
        "test_secret",
        expect.objectContaining({
          algorithm: "HS256",
          expiresIn: "10d",
        })
      );
    });

    it("should throw an error if the token is not generated", () => {
      jwt.sign.mockReturnValue(null);
      expect(() => service.generateToken(1, "admin"))
        .toThrow(new ApiError(500, API_MESSAGES.TOKEN_NOT_GENERATED));
    });
  });

  describe("execute", () => {
    it("should execute login successfully", async () => {
      const req = {
        body: { email: "test@test.com", password: "123456" },
      };

      const fakeUser = {
        id: 1,
        role: "user",
        password_hash: "fake_hash",
        get: jest.fn().mockReturnValue({
          id: 1,
          email: "test@test.com",
          password_hash: "fake_hash",
        }),
      };

      // mocks
      jest.spyOn(service, "validateInputs").mockReturnValue(true);
      jest.spyOn(service, "findUserByEmail").mockResolvedValue(fakeUser);
      jest.spyOn(service, "comparePasswords").mockReturnValue(true);
      jest.spyOn(service, "generateToken").mockReturnValue("fake_token");

      const result = await service.execute(req);

      expect(result).toEqual({
        token: "fake_token",
        user: { id: 1, email: "test@test.com" },
      });

      expect(logger.info).toHaveBeenCalledWith(API_MESSAGES.USER_LOGGED_IN_SUCCESSFULLY);
    });

    it("should propagate validation errors", async () => {
      const req = { body: {} };
      jest.spyOn(service, "validateInputs").mockImplementation(() => {
        throw new Error("Validation failed");
      });

      await expect(service.execute(req)).rejects.toThrow("Validation failed");
    });
  });
});
