// import { LocalStorageService } from "../services/LocalStorageService.js";
import { JsonServerService } from "../services/json-server-service.js";

class TaskController {
  constructor(model) {
    this.model = model;
    // this.LocalStorageService = new LocalStorageService();
    this.JsonServerService = new JsonServerService();
  }


  readData = async () => {
    const newDatas = (await this.JsonServerService.getData());
    this.model.restructureData(newDatas);
    return newDatas;
  }


  addNewData(title, status, createDate, updateDate) {
    const uniqueId = new Date().getTime();
    const taskDatas = this.model.addNew(
      { id: uniqueId, title, status, createDate, updateDate },
      status
    );
    console.log(taskDatas);
    this.LocalStorageService.saveToLocal(taskDatas);
    console.log(this.model.taskDatas);
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
