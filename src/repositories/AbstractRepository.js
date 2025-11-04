export default class AbstractRepository {
  constructor(model) {
    this.model = model;
  }

  async getAll(data) {
    return await this.model.findAll({ where: data });
  }

  async getOne(data) {
    return await this.model.findOne({ where: data });
  }

  async create(data) {
    return await this.model.create(data);
  }

  async update(data, id) {
    return await this.model.update(data, { where: { id } });
  }

  async delete(data) {
    return await this.model.destroy({ where: data });
  }
}