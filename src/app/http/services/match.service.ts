import AbstractService from "./_abstract.service";
import Request from "./request";

class MatchService extends AbstractService {
  name = 'matches/'

  async betting() {
    try {
      const response = await Request.get(`${this.name}/betting`,);

      return [response.data, null];
    } catch (error) {
      return [null, error];
    }
  }
}

export default new MatchService();
