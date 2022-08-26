import AbstractService from "./_abstract.service";

class TaskService extends AbstractService {
  name: string = 'tasks/'
}

export default new TaskService();
