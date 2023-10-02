import Observable from './observable.js';

class TaskModel extends Observable {
  constructor() {
    super();
    this.taskDatas =
    {
      todo: [
        // { id: 1, title: 'tantran', status: 'todo' },
        // { id: 2, title: 'ngale', status: 'todo' },
        // { id: 3, title: 'songoku', status: 'todo' }
      ],
      inprogress: [],
      done: []
    };
  }


  restructureData(data) {
    this.taskDatas = data;
    this.notify(this.taskDatas);
  }

  getData(id, status) {
    for (const key in this.taskDatas) {
      if (key == status) {
        const statusArray = this.taskDatas[key];
        for (let index = 0; index < statusArray.length; index++) {
          const object = statusArray[index];
          if (object.id == id) {
            return object;
          }
        }
      }
    }
  };

}

export { TaskModel };
