import Observer from './observer.js';
import { NEW_TASK, UPDATE_TASK } from "../constant/actions.js";

class TaskModalView extends Observer {
  constructor(taskController) {
    super();
    this.taskController = taskController;
    this.renderModal();
    this.modal = document.querySelector('.modal-update');
    this.taskController.model.addObserver(this);
  }

  renderModal() {
    this.updateModal = document.querySelector(".modal-update-wrapper");

    // Hide Modal when click on outside
    this.updateModal.addEventListener('click', (event) => {
      if (event.target == this.updateModal) {
        this.updateModal.classList.remove("show");
      }
    });

    // Render
    this.updateModal.innerHTML = `
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
      this.modal.removeAttribute('data-id');
      this.updateModal.classList.remove("show");
    });

    // Execute action when click confirm button
    this.btnConfirm = document.querySelector(".btn-confirm");
    this.btnConfirm.addEventListener("click", () => {
      if (this.modal.getAttribute('data-id') == null) {
        this.currentAction = NEW_TASK
        if (this.inputTitle.value.trim() == '') {
          alert('Input is Empty!');
        } else {
          const createdDate = new Date();
          this.taskController.addNewData(
            this.inputTitle.value,
            this.inputStatus.value,
            createdDate.toString(),
            createdDate.toString()
          );
          this.updateModal.classList.remove("show");
        }
      } else {
        this.currentAction = UPDATE_TASK
        if (this.inputTitle.value.trim() == '') {
          alert('Input is Empty!');
        } else {
          const updateDate = new Date();
          this.taskController.updateData(
            this.taskId,
            this.currentStatus,
            this.inputTitle.value,
            this.inputStatus.value,
            updateDate.toString()
          );
          this.modal.removeAttribute('data-id');
          this.updateModal.classList.remove("show");
        }
      }
    });
    this.modalTitle = document.querySelector(".modal-title");
    this.inputStatus = document.querySelector(".input-status");
    this.inputTitle = document.querySelector(".input-title");

    // Trigger Button Click on Enter
    this.inputTitle.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.btnConfirm.click();
        console.log('cliked');
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

            this.modalTitle.innerHTML = "Add New Task";
            this.btnConfirm.innerHTML = "Add";
            this.updateModal.classList.add("show");
            this.inputTitle.focus();
          }
          break;

        case "UPDATE_TASK":
          {
            this.currentAction = UPDATE_TASK;

            this.modal.setAttribute('data-id', `${data.task.id}`);

            this.taskId = data.task.id;
            this.currentStatus = data.task.status;

            this.inputTitle.value = data.task.title;
            this.inputStatus.value = data.task.status;


            this.modalTitle.innerHTML = "Update Task";
            this.btnConfirm.innerHTML = "Confirm";
            this.updateModal.classList.add("show");
            this.inputTitle.focus();
          }
          break;
      }
    }
  }
}

export { TaskModalView };
