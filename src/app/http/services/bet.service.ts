import AbstractService from "./_abstract.service";
import Request from "./request";

class BetService extends AbstractService {
  name = 'bets/'

  async findByMatch(data: object) {
    try {
      const response = await Request.post(
        `${this.name}find-one`, data
      );

      return [response.data, null];
    } catch (error) {
      return [null, error];
    }
  }
}

export default new BetService();
