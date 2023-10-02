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

  getItem() { };

  addItem() { };

  updateItem() { };

  deleteItem() { };

}

export { TaskModel };
