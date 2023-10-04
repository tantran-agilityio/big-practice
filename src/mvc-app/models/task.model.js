import Observable from './observable.js';

class TaskModel extends Observable {
  constructor() {
    super();
    this.taskDatas =
    {
      todo: [],
      inprogress: [],
      done: []
    };
  }

  // Load data from Local Storage -> to Service -> finally this.taskDatas
  restructureData(data) {
    this.taskDatas = data;
    this.notify(this.taskDatas);
  }

  // Define exactly object in status array -> assign important information for modal tag's attribute
  // *Copy the value of the object to manipulate it through the Modal*
  getData(id, status) {
    if (id && status) {
      const target = this.taskDatas[status];
      for (let index = 0; index < target.length; index++) {
        const object = target[index];
        if (object.id == id) {
          return object;
        }
      }
    }
  }

  addNew(task, status) {
    const target = this.taskDatas[status];
    target.push({ ...task });
    this.notify(this.taskDatas);
    return this.taskDatas;
  }

  update(id, status, newTitle, newStatus, newUpdateDate) {
    // Find exactly object with id
    const currentArray = this.taskDatas[status];
    const currentTask = currentArray.find((task) => task.id == id);

    // Condition to display error in console
    if (!currentTask) throw new Error('Task is not exist!');

    // If Task's status === new Status -> Just update content with new Title
    // Then sort Array by update Date
    if (status === newStatus) {
      currentTask.title = newTitle;
      currentTask.updateDate = newUpdateDate;
      // Sort array from past to present based on updateDate
      currentArray.sort((objA, objB) => new Date(objA.updateDate) - new Date(objB.updateDate));
    } else {
      // If Task's status != new Status -> remove current Task -> add to new Array and update new status && new title
      const newCurrentArray = currentArray.filter((task) => task.id !== id);
      currentTask.title = newTitle;
      currentTask.status = newStatus;
      currentTask.updateDate = newUpdateDate;
      const target = this.taskDatas[newStatus];
      target.push(currentTask);

      // Re-update data
      this.taskDatas = {
        ...this.taskDatas,
        [`${status}`]: newCurrentArray,
        [`${newStatus}`]: target
      };
    }
    this.notify(this.taskDatas);
    return this.taskDatas;
  }

  delete(id, status) {
    const currentArray = this.taskDatas[status];
    // Filter to remove Task and re-update data
    const newCurrentArray = currentArray.filter((task) => task.id != id);
    this.taskDatas = {
      ...this.taskDatas,
      [`${status}`]: newCurrentArray
    };
    this.notify(this.taskDatas);
    return this.taskDatas;
  }
}

export { TaskModel };
