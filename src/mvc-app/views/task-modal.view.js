import Observer from "./observer.js";
import { NEW_TASK, UPDATE_TASK } from "../constants/actions.js";

class TaskModalView extends Observer {
	constructor(taskController) {
		super();
		this.taskController = taskController;
		this.updateModalWrapper = document.querySelector(".modal-update-wrapper");
		this.renderModal();
		this.updateModal = document.querySelector(".modal-update");
		this.taskController.model.addObserver(this);
	}

	renderModal() {
		// Hide Modal when click on outside
		this.updateModalWrapper.addEventListener("click", (event) => {
			if (event.target == this.updateModalWrapper) {
				this.updateModalWrapper.classList.remove("show");
			}
		});

		// Render
		this.updateModalWrapper.innerHTML = `
      <div class='modal-update'>
        <h3 class='modal-title'>Add new Task</h3>
        <input class='input-title' type='text' value='' placeholder='Insert new title'>
        <p class='create-at'></p>
        <p class='update-at'></p>
        <div class='modal-function-wrapper'>
          <select class='input-status' id='status' name='status'>
            <option value="todo">To-do</option>
            <option value="inprogress">In-Progress</option>
            <option value="done">Done</option>
          </select>
          <div>
            <button class='btn-modal btn-cancel'>Cancel</button>
            <button class='btn-modal btn-confirm'></button>
          </div>
        </div>
      </div>
      `;

		// Hide modal when click Cancel
		this.btnCancel = document.querySelector(".btn-cancel");
		this.btnCancel.addEventListener("click", () => {
			this.updateModal.removeAttribute("data-id");
			this.updateModalWrapper.classList.remove("show");
		});

		// Execute action when click confirm button
		this.btnConfirm = document.querySelector(".btn-confirm");
		this.btnConfirm.addEventListener("click", async () => {
			if (this.updateModal.getAttribute("data-id") == null) {
				this.currentAction = NEW_TASK;
				if (this.inputTitle.value.trim() == "") {
					alert("Input is Empty!");
				} else {
					const createdDate = new Date();
					await this.taskController.addNewData(
						this.inputTitle.value,
						this.inputStatus.value,
						createdDate.toString(),
						createdDate.toString()
					);
					this.updateModalWrapper.classList.remove("show");
				}
			} else {
				this.currentAction = UPDATE_TASK;
				if (this.inputTitle.value.trim() == "") {
					alert("Input is Empty!");
				} else {
					const updateDate = new Date();
					this.taskController.updateData(
						this.taskId,
						this.currentStatus,
						this.inputTitle.value,
						this.inputStatus.value,
						updateDate.toString()
					);
					this.updateModal.removeAttribute("data-id");
					this.updateModalWrapper.classList.remove("show");
				}
			}
		});
		this.updateModalTitle = document.querySelector(".modal-title");
		this.inputStatus = document.querySelector(".input-status");
		this.inputTitle = document.querySelector(".input-title");

		// Trigger Button Confirm on Enter
		this.inputTitle.addEventListener("keydown", (event) => {
			if (event.key === "Enter") {
				this.btnConfirm.click();
			}
		});
	}

	update(data) {
		if (data.hasOwnProperty("action")) {
			switch (data.action) {
				case "NEW_TASK":
					{
						this.currentAction = NEW_TASK;

						this.inputTitle.value = "";
						this.inputStatus.value = data.status;

						this.updateModalTitle.innerHTML = "Add New Task";
						this.btnConfirm.innerHTML = "Add";
						this.updateModalWrapper.classList.add("show");
						setTimeout(() => {
							this.inputTitle.focus();
						}, 100);
					}
					break;

				case "UPDATE_TASK":
					{
						this.currentAction = UPDATE_TASK;

						this.updateModal.setAttribute("data-id", `${data.task.id}`);

						this.taskId = data.task.id;
						this.currentStatus = data.task.status;

						this.inputTitle.value = data.task.title;
						this.inputStatus.value = data.task.status;

						this.updateModalTitle.innerHTML = "Update Task";
						this.btnConfirm.innerHTML = "Confirm";
						this.updateModalWrapper.classList.add("show");
						setTimeout(() => {
							this.inputTitle.focus();
						}, 100);
					}
					break;
			}
		}
	}
}

export { TaskModalView };
