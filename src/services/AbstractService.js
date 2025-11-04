import { ApiError } from "../utils/error.js";

export default class AbstractService {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(req) {
    throw new ApiError(500, "Method not implemented");
  }

  validateInputs(value, schema) {
    throw new ApiError(500, "Method not implemented");
  }

  formatUser(user) {
    throw new ApiError(500, "Method not implemented");
  }

  parseFile(file) {
    throw new ApiError(500, "Method not implemented");
  }

}

