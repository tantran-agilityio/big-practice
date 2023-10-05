import { LocalStorageService } from "../services/LocalStorageService.js";

class TaskController {
	constructor(model) {
		this.model = model;
		this.LocalStorageService = new LocalStorageService();
	}

	readData() {
		const newDatas = this.LocalStorageService.getFromLocal();
		// If Local Storage is empty, push default blank format Structure of data in Model to LocalStorage
		if (newDatas == null) {
			this.LocalStorageService.saveToLocal(this.model.taskDatas);
		} else {
			// If LocalStorage has datas, push datas to Model, return Model for render method
			this.model.restructureData(newDatas);
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
			id,
			status,
			inputTitle,
			inputStatus,
			updateDate
		);
		this.LocalStorageService.saveToLocal(taskDatas);
	}

	openAddModal(status) {
		console.log(status);
		this.model.openAddModal(status);
	}

	openUpdateModal(task) {
		this.model.openUpdateModal(task);
	}
}

export { TaskController };
