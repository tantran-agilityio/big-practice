import { LocalStorageService } from "../services/LocalStorageService.js";

class TaskController {
  constructor(model) {
    this.model = model;
    this.LocalStorageService = new LocalStorageService();
    this.newData = this.LocalStorageService.getFromLocal();
  }

  readData() {
    // const newData = this.LocalStorageService.getFromLocal();
    this.model.restructureData(this.newData);
    return this.model.taskDatas;
  };

  addNewData(title, status) {
    const taskDatas = this.model.taskDatas;

    for (const key in taskDatas) {
      if (key == status) {
        const uniqueId = Math.floor(Math.random() * 3000);
        taskDatas[key].push({
          id: uniqueId,
          title: title,
          status: status
        });
      }
    }
    console.log(taskDatas);

    this.LocalStorageService.saveToLocal(taskDatas);
    this.model.restructureData(this.newData);
  };

  deleteData(index, status) {
    const taskDatas = this.model.taskDatas;
    for (const key in taskDatas) {
      if (status == key) {
        taskDatas[key].splice(index, 1);
      }
    }
    this.LocalStorageService.saveToLocal(taskDatas);
    this.model.restructureData(this.newData);
  };

  updateData(id, status) {
    const taskDatas = this.model.taskDatas;
    const task = this.model.getData(id, status);
    // Demo change title effect
    // task.title = 'has changed';
    this.LocalStorageService.saveToLocal(taskDatas);
    this.model.restructureData(this.newData);
  };

}

export { TaskController };
