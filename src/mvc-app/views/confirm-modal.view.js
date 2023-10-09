import Observer from "./observer.js";
import { DELETE_TASK } from "../constants/actions.js";

class ConfirmModalView extends Observer {
  constructor(taskController) {
    super();
    this.taskController = taskController;
    this.currentAction = DELETE_TASK;
    this.confirmModalWrapper = document.querySelector('.modal-confirm-wrapper');
    this.renderConfirmModal();
    this.confirmModal = document.querySelector('.modal-confirm')
    this.taskController.model.addObserver(this);
  }


  // Render default layout of Confirm Modal and add Event Listener for buttons
  renderConfirmModal() {

    // Hide Modal when click on outside
    this.confirmModalWrapper.addEventListener('click', (event) => {
      if (event.target == this.confirmModalWrapper) {
        this.confirmModalWrapper.classList.remove('show');
      }
    });

    // Render
    this.confirmModalWrapper.innerHTML = `
    <div class='modal-confirm' data-id='${this.taskId}'>
      <h3 class='modal-title modal-confirm-title'>Delete this Task?</h3>
      <button class='btn-modal btn-confirm-cancel' type='button'>Cancel</button>
      <button class='btn-modal btn-confirm-delete' type='button'>Confirm</button>
    </div>`;

    // Hide Modal when click Cancel button
    this.btnCancel = document.querySelector('.btn-confirm-cancel');
    this.btnCancel.addEventListener('click', () => {
      this.confirmModalWrapper.classList.remove('show');
    });

    // Execute action when click confirm button
    this.btnConfirmDelete = document.querySelector('.btn-confirm-delete');
    this.btnConfirmDelete.addEventListener('click', async () => {
      await this.taskController.deleteData(this.taskId, this.taskStatus);
      this.confirmModalWrapper.classList.remove('show');
    });
  }


  update(data) {
    if (data.hasOwnProperty("action")) {
      if (data.action == 'DELETE_TASK') {
        this.currentAction = DELETE_TASK;
        this.taskId = data.task.getAttribute('data-id');
        this.taskStatus = data.task.getAttribute('data-status');
        this.confirmModalWrapper.classList.add('show');
        this.confirmBtn = this.confirmModal.lastElementChild;
        setTimeout(() => {
          this.confirmModal.lastElementChild.focus();
        }, 100);
      }
    }
  }
}

export { ConfirmModalView };
