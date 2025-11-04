/**
 * @class AbstractRepository
 * @classdesc 
 * Base repository that defines common database operations (CRUD).  
 * All specific repositories (e.g., UserRepository, ProductRepository, etc.)
 * should extend this class and provide their own custom queries or overrides when needed.
 * 
 * This class expects a Sequelize-like model instance to be passed in the constructor.
 * 
 * @example
 * // Example of extending this abstract repository:
 * import AbstractRepository from "./AbstractRepository.js";
 * import User from "../models/User.js";
 * 
 * export default class UserRepository extends AbstractRepository {
 *   constructor() {
 *     super(User);
 *   }
 * 
 *   // Example of a custom query
 *   async findByEmail(email) {
 *     return await this.model.findOne({ where: { email } });
 *   }
 * }
 */
export default class AbstractRepository {
  /**
   * Creates a new repository instance.
   * @param {object} model - The ORM model (e.g., Sequelize model) associated with this repository.
   */
  constructor(model) {
    this.model = model;
  }

  /**
   * Retrieves all records matching the given filter.
   * 
   * @async
   * @param {object} [data] - Optional filter conditions for the query (Sequelize `where` clause).
   * @returns {Promise<Array<object>>} A list of matching records.
   */
  async getAll(data = {}) {
    return await this.model.findAll({ where: data });
  }

  /**
   * Retrieves a single record matching the given filter.
   * 
   * @async
   * @param {object} data - Filter conditions for the query.
   * @returns {Promise<object|null>} The matching record or `null` if not found.
   */
  async getOne(data) {
    return await this.model.findOne({ where: data });
  }

  /**
   * Creates a new record in the database.
   * 
   * @async
   * @param {object} data - The data to insert into the model.
   * @returns {Promise<object>} The created record.
   */
  async create(data) {
    return await this.model.create(data);
  }

  /**
   * Updates one or more records that match the given ID.
   * 
   * @async
   * @param {object} data - The data to update.
   * @param {number|string} id - The record ID to update.
   * @returns {Promise<[number]>} The number of affected rows.
   */
  async update(data, id) {
    return await this.model.update(data, { where: { id } });
  }

  /**
   * Deletes records that match the given filter.
   * 
   * @async
   * @param {object} data - Filter conditions for deletion.
   * @returns {Promise<number>} The number of deleted records.
   */
  async delete(data) {
    return await this.model.destroy({ where: data });
  }
}

/**
 * 🧭 Developer Guide:
 * -----------------------------------------------------
 * To create your own repository:
 * 1. Extend this class (e.g., `class UserRepository extends AbstractRepository`).
 * 2. Pass your model to the `super()` constructor.
 * 3. Override or add new methods for custom queries.
 * -----------------------------------------------------
 * Example:
 * async findByUsername(username) {
 *   return await this.model.findOne({ where: { username } });
 * }
 * -----------------------------------------------------
 */
