import { JsonServerService } from "../services/json-server-service.js";

class TaskController {
  constructor(model) {
    this.model = model;
    this.JsonServerService = new JsonServerService();
  }


  async readData(status) {
    // const newDatas = this.LocalStorageService.getFromLocal();
    // if (newDatas) {
    //   this.model.restructureData(newDatas);
    //   return this.model.taskDatas;
    // } else {
    //   this.LocalStorageService.saveToLocal(this.model.taskDatas);
    //   return this.model.taskDatas;
    // }
    const newDatas = await this.JsonServerService.get(status);
    this.model.restructureData(newDatas, status);
  }


  async addNewData(title, status, createDate, updateDate) {
    const uniqueId = new Date().getTime();
    const newData = { id: uniqueId, title, status, createDate, updateDate };
    this.model.addNew(newData, status);
    await this.JsonServerService.add(newData);
  }


  async updateData(id, currentStatus, title, status, createDate, updateDate) {
    const data = { id, title, status, createDate, updateDate };
    this.model.update(id, currentStatus, title, status, updateDate);
    // this.LocalStorageService.saveToLocal(taskDatas);
    await this.JsonServerService.update(data, currentStatus);
  }


  async deleteData(id, status) {
    const data = { id, status };
    this.model.delete(id, status);
    // this.LocalStorageService.saveToLocal(id);
    await this.JsonServerService.delete(data);
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
