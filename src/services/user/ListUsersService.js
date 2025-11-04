import AbstractService from '../AbstractService.js';

export class ListarUsuariosService extends AbstractService {
  constructor(repository) {
    super(repository);
  }

  async execute(req) {
    try {
      /**
       * @todo implementar paginação
       */
    } catch (error) {
      throw error;
    }
  }
}