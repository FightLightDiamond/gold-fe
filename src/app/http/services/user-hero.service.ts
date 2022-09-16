import AbstractService from "./_abstract.service";
import Request from "./request";

class UserHeroService extends AbstractService {
  name = 'user-heroes/'

  async getCharts(filter: any) {
    return this.index(filter)
  }

  /**
   * Get My Heroes
   */
  async getMyHeroes(body: any) {
    try {
      const response = await Request.get(`${this.name}my-heroes/`, body);

      return [response.data, null];
    } catch (error) {
      return [null, error];
    }
  }

  async selectHero(body: any) {
    return this.store(body)
  }

  async addPoint(id: number, body: any) {
    return this.update(id, body)
  }

  async levelUp(id: number, body: any) {
    try {
      const response = await Request.put(`${this.name}level-up/${id}`, body);

      return [response.data, null];
    } catch (error) {
      return [null, error];
    }
  }
}

export default new UserHeroService();
