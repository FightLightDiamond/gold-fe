import Request from "./request";

const SectionService = {
  index: async (filter: any) => {
    try {
      const response = await Request.get(`tut/section/`, filter);

      return [response.data, null];
    } catch (error) {
      return [null, error];
    }
  },

  store: async (data: {name: string}) => {
    try {
      const response = await Request.post(
        `tut/section/`
      );

      return [response.data, null];
    } catch (error) {
      return [null, error];
    }
  },

  find: async (id: number) => {
    try {
      const response = await Request.get(`tut/section/${id}`);

      return [response.data, null];
    } catch (error) {
      return [null, error];
    }
  },

  update: async (id: number, data: any) => {
    try {
      const response = await Request.put(`tut/section/${id}`, data);

      return [response.data, null];
    } catch (error) {
      return [null, error];
    }
  },

  delete: async (id: number) => {
    try {
      const response = await Request.delete(`tut/section/${id}`);

      return [response.data, null];
    } catch (error) {
      return [null, error];
    }
  },
};

export default SectionService;
