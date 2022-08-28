import AbstractService from "./_abstract.service";
import Request from "./request";

class MatchService extends AbstractService {
  name = 'matches/'

  async getCurrentMatch() {
    try {
      const response = await Request.get(`${this.name}current`,);

      return [response.data, null];
    } catch (error) {
      return [null, error];
    }
  }
}

export default new MatchService();
