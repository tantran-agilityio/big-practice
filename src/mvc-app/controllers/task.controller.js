import { LocalStorageService } from "../services/LocalStorageService.js";

class TaskController {
  constructor(model) {
    this.model = model;
    this.LocalStorageService = new LocalStorageService();
  }


  readData() {
    const newDatas = this.LocalStorageService.getFromLocal();
    if (newDatas) {
      this.model.restructureData(newDatas);
      return this.model.taskDatas;
    } else {
      this.LocalStorageService.saveToLocal(this.model.taskDatas);
      return this.model.taskDatas;
    }
  }


  addNewData(title, status, createDate, updateDate) {
    const uniqueId = new Date().getTime();
    const taskDatas = this.model.addNew(
      { id: uniqueId, title, status, createDate, updateDate },
      status
    );
    this.LocalStorageService.saveToLocal(taskDatas);
  }


  deleteData(id, status) {
    const taskDatas = this.model.delete(id, status);
    this.LocalStorageService.saveToLocal(taskDatas);
  }


  updateData(id, status, inputTitle, inputStatus, updateDate) {
    const taskDatas = this.model.update(
      id, status, inputTitle, inputStatus, updateDate
    );
    this.LocalStorageService.saveToLocal(taskDatas);
  }


  openAddModal(status) {
    this.model.openAddModal(status);
  }


  openUpdateModal(task) {
    this.model.openUpdateModal(task);
  }


  openConfirmModal(task) {
    this.model.openConfirmModal(task);
  }
}

export { TaskController };
