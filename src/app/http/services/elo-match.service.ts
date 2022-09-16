import AbstractService from "./_abstract.service";
import Request from "./request";

class EloMatchService extends AbstractService {
  name = 'elo-matches/'

  /**
   * fight
   * @param body
   */
  async fight(body: {
    competitor: number
  }) {
    return this.store(body)
  }

  /**
   * histories
   * @param param
   */
  async histories(param: {
    competitor: number
  }) {
    try {
      const response = await Request.post(
        `${this.name}histories`, param
      );

      return [response.data, null];
    } catch (error) {
      return [null, error];
    }
  }
}

export default new EloMatchService();
