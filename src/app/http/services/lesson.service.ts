import Request from "./request";

const LessonService = {
  index: async (filter: any) => {
    try {
      const response = await Request.get(`tut/lesson/`, filter);

      return [response.data, null];
    } catch (error) {
      return [null, error];
    }
  },

  store: async (data: {name: string}) => {
    try {
      const response = await Request.post(
        `tut/lesson/`
      );

      return [response.data, null];
    } catch (error) {
      return [null, error];
    }
  },

  find: async (id: number | undefined) => {
    try {
      const response = await Request.get(`tut/lesson/${id}`);

      return [response.data, null];
    } catch (error) {
      return [null, error];
    }
  },

  update: async (id: number, data: any) => {
    try {
      const response = await Request.put(`tut/lesson/${id}`, data);
      console.log('update', response)
      return [response.data, null];
    } catch (error) {
      return [null, error];
    }
  },

  delete: async (id: number) => {
    try {
      const response = await Request.delete(`tut/lesson/${id}`);

      return [response.data, null];
    } catch (error) {
      return [null, error];
    }
  },
};

export default LessonService;
