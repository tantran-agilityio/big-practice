import { LocalStorageService } from "../services/LocalStorageService.js";

class TaskController {
  constructor(model) {
    this.model = model;
    this.LocalStorageService = new LocalStorageService();
  }

  readData() {
    const newDatas = this.LocalStorageService.getFromLocal();
    if (newDatas == null) {
      this.LocalStorageService.saveToLocal(this.model.taskDatas);
      console.log(this.model.taskDatas);
    } else {
      this.LocalStorageService.saveToLocal(newDatas);
      this.model.restructureData(newDatas);
      return this.model.taskDatas;
    }
  };

  addNewData(title, status, createDate, updateDate) {
    const uniqueId = new Date().getTime();
    const taskDatas = this.model.addNew(
      { id: uniqueId, title, status, createDate, updateDate },
      status
    );

    this.LocalStorageService.saveToLocal(taskDatas);
    const newDatas = this.LocalStorageService.getFromLocal();
    this.model.restructureData(newDatas);
  };

  deleteData(id, status) {
    const taskDatas = this.model.delete(id, status);
    this.LocalStorageService.saveToLocal(taskDatas);
    const newDatas = this.LocalStorageService.getFromLocal();
    this.model.restructureData(newDatas);
  };

  updateData(id, status, inputTitle, inputStatus, updateDate) {
    const taskDatas = this.model.update(
      id, status, inputTitle, inputStatus, updateDate
    );
    this.LocalStorageService.saveToLocal(taskDatas);
    const newDatas = this.LocalStorageService.getFromLocal();
    this.model.restructureData(newDatas);
  };

}

export { TaskController };
