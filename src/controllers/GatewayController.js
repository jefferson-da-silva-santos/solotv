/**
 * @class GatewayController
 * @classdesc 
 * Generic base controller that handles HTTP requests and responses.  
 * It acts as a bridge between routes and service layers, abstracting
 * the logic for sending responses and handling errors.
 * 
 * This controller uses a Service instance that must implement an `execute(req)` method.
 * 
 * @example
 * // Example of extending and using the GatewayController:
 * import GatewayController from "./GatewayController.js";
 * import UserService from "../services/UserService.js";
 * 
 * const userService = new UserService();
 * const userController = new GatewayController(userService);
 * 
 * app.get("/users", (req, res, next) => userController.handle(req, res, next));
 */
export default class GatewayController {
  /**
   * Creates a new GatewayController instance.
   * @param {object} service - The service layer instance that handles business logic.
   */
  constructor(service) {
    this.service = service;
  }

  /**
   * Handles an incoming HTTP request and sends the appropriate response.
   * 
   * @async
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {object} [params] - Optional response configuration.
   * @param {boolean} [params.sendHtml=false] - Whether to send an HTML file.
   * @param {boolean} [params.sendFile=false] - Whether to send a file download.
   * 
   * @returns {Promise<void>}
   * @throws {Error} If the service execution fails.
   */
  async handle(
    req,
    res,
    next,
    params = {
      sendHtml: false,
      sendFile: false
    }
  ) {
    try {
      const data = await this.service.execute(req);

      if (params.sendHtml) {
        return res.sendFile(data.path, {
          headers: {
            "Content-Type": "text/html",
            "Content-Security-Policy": "script-src 'self' 'unsafe-inline';"
          }
        });
      }

      if (params.sendFile) {
        return res.sendFile(data.path, {
          headers: {
            "Content-Type": "application/octet-stream",
            "Content-Security-Policy": "script-src 'self' 'unsafe-inline';"
          }
        });
      }

      return res.status(200).json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  }
}

/**
 * 🧭 Developer Guide:
 * -----------------------------------------------------
 * To create your own controller:
 * 1. Instantiate this class by passing a Service:
 *    const controller = new GatewayController(new MyService());
 * 
 * 2. In your routes:
 *    router.get("/", (req, res, next) => controller.handle(req, res, next));
 * 
 * 3. To return files:
 *    controller.handle(req, res, next, { sendFile: true });
 * 
 * 4. To return HTML:
 *    controller.handle(req, res, next, { sendHtml: true });
 * 
 * 5. Errors are automatically passed to Express error middleware.
 * -----------------------------------------------------
 */
