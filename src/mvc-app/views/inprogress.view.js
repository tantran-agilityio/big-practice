import Observer from './observer.js';
import trashIcon from '../../assets/images/trash.svg';

class InprogressView extends Observer {
  constructor(controller) {
    super();
    this.controller = controller;

    // Define required elements's node in DOM
    this.updateModal = document.querySelector('.modal-update-wrapper');
    this.todoList = document.querySelector('.inprogress-list');
    this.confirmModal = document.querySelector('.modal-confirm-wrapper');
    this.btnAdd = document.querySelector('.img-add-inprogress');
    this.btnAdd.addEventListener('click', (e) => { this.openUpdateModal(e) });

    // Load current tasks when load page
    window.addEventListener('load', () => {
      this.render(this.controller.readData());
    });

    // Observe taskDatas in TaskModel
    this.controller.model.addObserver(this);
  };

  render(data) {

    this.todoList.innerHTML = '';
    // Get todo property
    for (const key in data) {
      if (key == 'inprogress') {
        let dataArray = data[key];
        // Loop throught todo Array - get each object in todo Array
        for (let index = 0; index < dataArray.length; index++) {
          const dataItem = dataArray[index];
          // Assign to render task function
          this.todoList.appendChild(this.generateTask(dataItem));
        }

        const listItem = document.querySelectorAll('.inprogress-task');
        for (const item of listItem) {
          item.addEventListener('click', (e) => {
            if (e.target == item) {
              this.openUpdateModal(e);
            }
          });
        }

        const trashBtnList = document.querySelectorAll('.trash-img-inprogress');
        for (const trashBtn of trashBtnList) {
          trashBtn.addEventListener('click', (e) => {
            this.openConfirmModal(e);
          });
        }
      }
    }
  };

  generateTask(data) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
    <div class='task inprogress-task' data-id='${data.id}' data-status='${data.status}'>
    <h3>${data.title}</h3>
    <button>
    <img class='trash-img-inprogress' src='${trashIcon}'>
    </button>
    </div>
    `;
    return listItem;
  };

  generateUpdateModal(data) {
    if (data) {
      this.updateModal.innerHTML = `
      <div class='modal-update' data-id='${data.id}' data-status='${data.status}'>
      <h3 class='modal-update-title'>Update</h3>
      <input class='input-title' type='text' value='${data.title}'>
      <p class='create-at'></p>
      <p class='update-at'></p>
      <select class='input-status' id='status' name='status'>
      <option value="default">Choose a status</option>
      <option value="todo">To-do</option>
      <option value="inprogress">In-Progress</option>
      <option value="done">Done</option>
      </select>
      <button class='btn-cancel'>Cancel</button>
      <button class='btn-confirm'>Confirm</button>
      </div>
      `;
      const inputStatus = document.querySelector('.input-status');
      inputStatus.value = data.status;
      return this.updateModal;
    } else {
      this.updateModal.innerHTML = `
      <div class='modal-update' data-id='' data-status=''>
      <h3 class='modal-update-title'>Add new Task</h3>
      <input class='input-title' type='text' value=''>
      <p class='create-at'></p>
      <p class='update-at'></p>
      <select class='input-status' id='status' name='status'>
      <option value="default">Choose a status</option>
      <option value="todo">To-do</option>
      <option value="inprogress">In-Progress</option>
      <option value="done">Done</option>
      </select>
      <button class='btn-cancel'>Cancel</button>
      <button class='btn-confirm'>Add</button>
      </div>
      `;
      const inputStatus = document.querySelector('.input-status');
      inputStatus.value = 'inprogress';
      return this.updateModal;
    }
  };

  openUpdateModal(e) {
    // Get exactly data of clicked from Model
    const taskId = e.target.getAttribute('data-id');
    const taskStatus = e.target.getAttribute('data-status');
    const taskItem = this.controller.model.getData(taskId, taskStatus);

    this.generateUpdateModal(taskItem);
    this.updateModal.classList.add('show');
    const btnConfirm = document.querySelector('.btn-confirm');
    btnConfirm.addEventListener('click', (e) => {
      const modal = e.target.parentNode;
      const inputTitle = modal.querySelector('.input-title');
      const inputStatus = modal.querySelector('.input-status');

      this.updateModal.classList.remove('show');
      if (taskItem == undefined) {
        this.controller.addNewData(inputTitle.value, inputStatus.value);
      } else {
        const dataId = taskItem.id;
        const dataStatus = taskItem.status;
        this.controller.updateData(dataId, dataStatus, inputTitle.value, inputStatus.value);
      }
    });

    const btnCancel = document.querySelector('.btn-cancel');
    btnCancel.addEventListener('click', (e) => {
      this.updateModal.classList.remove('show');
    })
  };

  generateConfirmModal(element) {
    this.confirmModal.innerHTML = `
    <div class='modal-confirm' data-id='${element.getAttribute('data-id')}'>
    <h3 class='modal-confirm-title'>Delete this Task?</h3>
    <button class='btn-cancel-delete'>Cancel</button>
    <button class='btn-confirm-delete'>Confirm</button>
    </div>
    `;
    return this.confirmModal;
  };

  openConfirmModal(e) {
    const trashBtn = e.target.parentNode;
    this.generateConfirmModal(trashBtn.parentNode);
    this.confirmModal.classList.add('show');

    const btnCancelDelete = document.querySelector('.btn-cancel-delete');
    btnCancelDelete.addEventListener('click', () => {
      this.confirmModal.classList.remove('show');
    });

    const btnConfirmDelete = document.querySelector('.btn-confirm-delete');
    btnConfirmDelete.addEventListener('click', () => {
      const taskList = document.querySelectorAll('.inprogress-task');

      for (let index = 0; index < taskList.length; index++) {
        if (trashBtn.parentNode == taskList[index]) {
          const dataStatus = taskList[index].getAttribute('data-status');
          this.controller.deleteData(index, dataStatus);
        }
      }
      this.confirmModal.classList.remove('show');
    });
  };

  update(data) {
    this.render(data);
  };
}

export { InprogressView };
