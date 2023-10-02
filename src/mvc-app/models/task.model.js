import Observable from "./observable.js";

class TaskModel extends Observable {
	constructor() {
		super();
		this.taskDatas = {
			todo: [],
			inprogress: [],
			done: [],
		};
	}

	restructureData(data) {
		this.taskDatas = data;
		this.notify(this.taskDatas);
	}

	getData(id, status) {
		// status => todo, inprogress, done
		const target = this.taskDatas[status];
		for (let index = 0; index < target.length; index++) {
			const object = target[index];
			if (object.id == id) {
				return object;
			}
		}

		// Too complicate
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
	}

	addNew(task, status) {
		const target = this.taskDatas[status];
		target.push(...task);
		this.notify(this.taskDatas);
		return this.taskDatas;
	}

	update(id, status, newTitle, newStatus) {
		// find object with id
		const current = this.taskDatas[status];
		const currentTask = current.find((task) => task.id === id);

		if (!currentTask) throw new Error("task is not exist");

		// if status === newStatus
		// update content with newTitle
		if (status === newStatus) {
			currentTask.title = newTitle;
		} else {
			// else status !== newStatus
			// remove current object out of current status
			// add to new status and update newTitle

			const target = this.taskDatas[newStatus];
			target.push(currentTask);
			const newCurrent = current.filter((task) => task.id !== id);

			this.taskDatas = {
				...this.taskDatas,
				[`${status}`]: newCurrent,
				[`${newStatus}`]: target,
			};
		}

		this.notify(this.taskDatas);
		return this.taskDatas;
	}
}

export { TaskModel };
