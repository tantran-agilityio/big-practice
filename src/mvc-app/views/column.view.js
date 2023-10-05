import Observer from "./observer.js";
import trashIcon from "../../assets/images/trash.svg";

class ColumnView extends Observer {
	constructor(taskController, status) {
		super();
		this.taskController = taskController;
		this.status = status;

		// Define required element's nodes in DOM
		this.column = document.querySelector(`.${this.status}-list`);
		this.btnAdd = document.querySelector(`.img-add-${this.status}`);

		// Open modal when click add button
		console.log(this.btnAdd);
		this.btnAdd.addEventListener("click", () => {
			console.log("add new task");
			this.taskController.openAddModal(this.status);
		});

		// Render current tasks when load page
		this.render(this.taskController.model.taskDatas, status);

		this.taskController.model.addObserver(this);
	}

	render(data, status) {
		this.column.innerHTML = "";
		const statusArray = data[status];
		// Get each object in todo Array
		for (let index = 0; index < statusArray.length; index++) {
			const taskObject = statusArray[index];
			// Assign object to generate task method
			const taskItem = this.column.appendChild(this.generateTask(taskObject));
			taskItem.addEventListener("click", (event) => {
				if (event.target != trashBtn) {
					console.log("this is a Task");
					// this.updateModalView
					console.log("data.id", taskObject.id);
					this.taskController.openUpdateModal(taskObject);
				}
			});

			const trashBtn =
				taskItem.lastElementChild.lastElementChild.firstElementChild;
			trashBtn.addEventListener("click", () => {
				// Get data-attribute of task
				const task = trashBtn.parentNode.parentNode;
				console.log("this is a trash button");
				// this.confirmModalView
			});

			// Render truoc modals
			const confirmModal = document.querySelector(".modal-confirm-wrapper");
			const editModal = document.querySelector(".modal-edit-wrapper");
		}

		// Render counter
		const taskCounter = document.querySelector(`.${status}-counter`);
		taskCounter.innerText = `" ${statusArray.length} "`;

		// Open update modal when click on Task
		// for (const task of taskList) {
		//   item.addEventListener('click', (event) => {
		//     if (event.target == task) {
		//       this.openUpdateModal(event);
		//     }
		//   });
		// }

		// Open confirm modal when click trash button
		// const trashBtnList = document.querySelectorAll(`.trash-img-${status}`);
		// for (const trashBtn of trashBtnList) {
		//   trashBtn.addEventListener('click', (event) => {
		//     // this.openConfirmModal(event);
		//     trashBtn.removeEventListener('click', openModal());
		//     console.log('second function');
		//   });
		// }
	}

	generateTask(data) {
		// Convert DateString to Date
		const createDate = new Date(data.createDate);
		const updateDate = new Date(data.updateDate);

		const listItem = document.createElement("li");
		if (data.createDate === data.updateDate) {
			listItem.innerHTML = `
      <div class='task ${data.status}-task' data-id='${data.id}' data-status='${
				data.status
			}'>
        <div>
          <h3 class='task-title'>${data.title}</h3>
          <p class='task-date create-date'>Create at: ${(
						"0" + createDate.getHours()
					).slice(-2)}:${("0" + createDate.getMinutes()).slice(-2)}
          ( ${("0" + (createDate.getMonth() + 1)).slice(-2)} / ${(
				"0" + createDate.getDate()
			).slice(-2)} )</p>
        </div>
        <button class='trash-btn'>
          <img class='trash-img trash-img-${data.status}' src='${trashIcon}'>
        </button>
      </div>
      `;
			return listItem;
		} else {
			listItem.innerHTML = `
      <div class='task ${data.status}-task' data-id='${data.id}' data-status='${
				data.status
			}'>
        <div>
          <h3 class='task-title'>${data.title}</h3>
          <p class='task-date create-date'>Create at: ${(
						"0" + createDate.getHours()
					).slice(-2)}:${("0" + createDate.getMinutes()).slice(-2)}
          ( ${("0" + (createDate.getMonth() + 1)).slice(-2)} / ${(
				"0" + createDate.getDate()
			).slice(-2)} )</p>
          <p class='task-date update-date'>Update at: ${(
						"0" + updateDate.getHours()
					).slice(-2)}:${("0" + updateDate.getMinutes()).slice(-2)}
          ( ${("0" + (updateDate.getMonth() + 1)).slice(-2)} / ${(
				"0" + updateDate.getDate()
			).slice(-2)} )</p>
        </div>
        <button class='trash-btn'>
          <img class='trash-img trash-img-${data.status}' src='${trashIcon}'>
        </button>
      </div>
      `;
			return listItem;
		}
	}

	update(data) {
		if (!data.hasOwnProperty("action")) {
			this.render(data, this.status);
		}
	}
}

export { ColumnView };
