import Observer from './observer.js';

class PrimaryModalView extends Observer {
  constructor(taskController) {
    super();
    this.taskController = taskController;
    this.addModalView = addModalView;
    this.updateModalView = updateModalView;
    this.confirmModalView = confirmModalView;
    this.status = status;

    this.taskController.model.addObserver(this);
  }


  generateUpdateModal(data) {
    if (data) {
      this.updateModal.innerHTML = `
      <div class='modal-update' data-id='${data.id}' data-status='${data.status}'>
        <h3 class='modal-title'>Update</h3>
        <input class='input-title' type='text' value='${data.title}'>
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
            <button class='btn-modal btn-confirm'>Confirm</button>
          </div>
        </div>
      </div>
      `;
      const inputStatus = document.querySelector('.input-status');
      inputStatus.value = data.status;
      return this.updateModal;
    } else {
      this.updateModal.innerHTML = `
      <div class='modal-update' data-id='' data-status=''>
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
            <button class='btn-modal btn-confirm'>Add</button>
          </div>
        </div>
      </div>
      `;
      const inputStatus = document.querySelector('.input-status');
      inputStatus.value = 'todo';
      return this.updateModal;
    }
  }


  openUpdateModal(event) {
    const taskId = event.target.getAttribute('data-id');
    const taskStatus = event.target.getAttribute('data-status');
    const taskItem = this.controller.model.getData(taskId, taskStatus)

    this.generateUpdateModal(taskItem);
    this.updateModal.classList.add('show');
    const btnConfirm = document.querySelector('.btn-confirm');

    // Define logic of (confirm - add) button
    // Call addNewData if modal render Empty title
    // Call updateData when modal get valid title
    // Finally alert an error to prevent user input empty title
    btnConfirm.addEventListener('click', () => {
      const inputTitle = document.querySelector('.input-title');
      const inputStatus = document.querySelector('.input-status');
      const createDate = new Date();
      let updateDate;

      if (inputTitle.value) {
        this.updateModal.classList.remove('show');
        if (taskItem == undefined) {
          updateDate = createDate;
          this.controller.addNewData(inputTitle.value, inputStatus.value, createDate.toString(), updateDate.toString());
        } else {
          updateDate = new Date();
          const dataId = taskItem.id;
          const dataStatus = taskItem.status;
          this.controller.updateData(dataId, dataStatus, inputTitle.value, inputStatus.value, updateDate.toString());
        }
      } else {
        alert('Input is empty');
      }
    });

    // Hide modal when click Cancel
    const btnCancel = document.querySelector('.btn-cancel');
    btnCancel.addEventListener('click', () => {
      this.updateModal.classList.remove('show');
    })
  }

  update() { }
}

export { PrimaryModalView };
