import Request from "./request";

export default class AbstractService {
  name: string = ''

  async index(filter: object) {
    try {
      const response = await Request.get(`${this.name}`, filter);

      return [response.data, null];
    } catch (error) {
      return [null, error];
    }
  }

  async store(data: object) {
    try {
      const response = await Request.post(
        `${this.name}`, data
      );

      return [response.data, null];
    } catch (error) {
      return [null, error];
    }
  }

  async find(id: number | undefined) {
    try {
      const response = await Request.get(`${this.name}${id}`);

      return [response.data, null];
    } catch (error) {
      return [null, error];
    }
  }

  async update(id: number, data: object) {
    try {
      const response = await Request.put(`${this.name}${id}`, data);

      return [response.data, null];
    } catch (error) {
      return [null, error];
    }
  }

  async delete(id: number) {
    try {
      const response = await Request.delete(`${this.name}${id}`);

      return [response.data, null];
    } catch (error) {
      return [null, error];
    }
  }
}
