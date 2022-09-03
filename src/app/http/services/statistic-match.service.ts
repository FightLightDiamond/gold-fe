import AbstractService from "./_abstract.service";
import Request from "./request";
class StatisticMatchService extends AbstractService {
  name = "statistic-matches/";

  async getStatisticMatches() {
    try {
      const response = await Request.get(`${this.name}`);

      return [response.data, null];
    } catch (error) {
      return [null, error];
    }
  }
}

export default new StatisticMatchService();
