import { Router } from "express";
import auth from "../middlewares/auth.js";
import GatewayController from "../controllers/GatewayController.js";
import { UserLoginService } from "../services/user/LoginUserService.js";
import { ListarUsuariosService } from "../services/user/ListUsersService.js";

// factory
export default function userRoutes(repository = null) {
  const router = Router();

  router.post("/login", async (req, res, next) => {
    const controller = new GatewayController(new UserLoginService(repository));
    return await controller.handle(req, res, next);
  });
  
  router.get('/', auth, (req, res, next) => {
    const controller = new AbstractController(new ListarUsuariosService(repository));
    return controller.handle(req, res, next);
  });

  return router;
}