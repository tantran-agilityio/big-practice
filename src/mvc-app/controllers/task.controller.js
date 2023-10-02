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

  addNewData(dataTitle, dataStatus) {
    const taskDatas = this.model.taskDatas;

    for (const key in taskDatas) {
      if (dataStatus == key) {
        taskDatas[key].push({
          id: 1,
          title: dataTitle,
          status: dataStatus
        });
      }
    }

    // for (const key in taskDatas) {
    //   if (dataStatus == key) {
    //     taskDatas[key].push({
    //       id: 1,
    //       title: dataTitle,
    //       status: dataStatus
    //     });
    //   }
    // }

    this.LocalStorageService.saveToLocal(taskDatas);
    // const newData = this.LocalStorageService.getFromLocal();
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

}

export { TaskController };
