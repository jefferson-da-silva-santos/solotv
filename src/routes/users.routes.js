import { Router } from "express";
import auth from "../middlewares/auth.js";
import GatewayController from "../controllers/GatewayController.js";
import { UserLoginService } from "../services/user/LoginUserService.js";
import { ListarUsuariosService } from "../services/user/ListUsersService.js";

/**
 * Factory Function Pattern
 * 
 * Creates and configures user-related routes.
 * The repository dependency is injected for better flexibility and testing.
 *
 * @param {import('../repositories/AbstractRepository.js').default|null} repository - Repository instance for database operations.
 * @returns {import('express').Router} Configured Express Router instance.
 */
export default function userRoutes(repository = null) {
  const router = Router();

  /**
   * POST /login
   * Authenticates a user and returns a JWT token.
   */
  router.post("/login", async (req, res, next) => {
    const controller = new GatewayController(new UserLoginService(repository));
    return await controller.handle(req, res, next);
  });

  /**
   * GET /
   * Lists all users (protected route).
   */
  router.get("/", auth, (req, res, next) => {
    const controller = new AbstractController(new ListarUsuariosService(repository));
    return controller.handle(req, res, next);
  });

  /**
   * Continue your code below this line.
   * 
   * Add new user-related routes here.
   * Example:
   * 
   * router.post('/register', async (req, res, next) => {
   *   const controller = new GatewayController(new RegisterUserService(repository));
   *   return await controller.handle(req, res, next);
   * });
   */

  return router;
}
