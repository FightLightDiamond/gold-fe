import AbstractService from "./_abstract.service";

class EloMatchService extends AbstractService {
  name = 'matches/'

  async fight(body: {
    competitor: number
  }) {
    return this.store(body)
  }
}

export default new EloMatchService();
