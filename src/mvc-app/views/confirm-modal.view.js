import Observer from "./observer.js";
import { DELETE_TASK } from "../constant/actions.js";

class ConfirmModalView extends Observer {
  constructor(taskController) {
    super();
    this.taskController = taskController;
    this.currentAction = DELETE_TASK;
    this.confirmModal = document.querySelector('.modal-confirm-wrapper');

    this.renderModal();

    this.taskController.model.addObserver(this);
  }

  // Render default layout of Confirm Modal and add Event Listener for buttons
  renderModal() {

    // Hide Modal when click on outside
    this.confirmModal.addEventListener('click', (event) => {
      if (event.target == this.confirmModal) {
        this.confirmModal.classList.remove('show');
      }
    });

    // Render
    this.confirmModal.innerHTML = `
    <div class='modal-confirm' data-id='${this.taskId}'>
      <h3 class='modal-title modal-confirm-title'>Delete this Task?</h3>
      <button class='btn-modal btn-confirm-cancel'>Cancel</button>
      <button class='btn-modal btn-confirm-delete'>Confirm</button>
    </div>`;

    // Hide Modal when click Cancel button
    this.btnCancel = document.querySelector('.btn-confirm-cancel');
    this.btnCancel.addEventListener('click', () => {
      this.confirmModal.classList.remove('show');
    });

    // Execute action when click confirm button
    this.btnConfirmDelete = document.querySelector('.btn-confirm-delete');
    this.btnConfirmDelete.addEventListener('click', () => {
      this.taskController.deleteData(this.taskId, this.taskStatus);
      this.confirmModal.classList.remove('show');
    });
  }

  update(data) {
    if (data.hasOwnProperty("action")) {
      if (data.action == 'DELETE_TASK') {
        this.currentAction = DELETE_TASK;
        this.taskId = data.task.getAttribute('data-id');
        this.taskStatus = data.task.getAttribute('data-status');
        this.confirmModal.classList.add('show');
      }
    }
  }
}

export { ConfirmModalView };
