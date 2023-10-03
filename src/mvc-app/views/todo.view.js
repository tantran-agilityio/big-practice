import Observer from './observer.js';
import trashIcon from '../../assets/images/trash.svg';

class TodoView extends Observer {
  constructor(controller) {
    super();
    this.controller = controller;

    // Define required elements's node in DOM
    this.updateModal = document.querySelector('.modal-update-wrapper');
    this.todoList = document.querySelector('.todo-list');
    this.confirmModal = document.querySelector('.modal-confirm-wrapper');
    this.btnAdd = document.querySelector('.img-add-todo');
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
      if (key == 'todo') {
        let dataArray = data[key];
        // Loop throught todo Array - get each object in todo Array
        for (let index = 0; index < dataArray.length; index++) {
          const dataItem = dataArray[index];
          // Assign to render task function
          this.todoList.appendChild(this.generateTask(dataItem));
        }

        const listItem = document.querySelectorAll('.todo-task');
        for (const item of listItem) {
          item.addEventListener('click', (e) => {
            if (e.target == item) {
              this.openUpdateModal(e);
            }
          });
        }

        const trashBtnList = document.querySelectorAll('.trash-img-todo');
        for (const trashBtn of trashBtnList) {
          trashBtn.addEventListener('click', (e) => {
            this.openConfirmModal(e);
          });
        }
      }
    }
  };

  generateTask(data) {
    // Convert String to Date
    const createDate = new Date(data.createDate);
    const updateDate = new Date(data.updateDate);

    const listItem = document.createElement('li');
    if (data.createDate === data.updateDate) {
      listItem.innerHTML = `
      <div class='task todo-task' data-id='${data.id}' data-status='${data.status}'>
      <h3 class='task-title'>${data.title}</h3>
      <p class='create-date'>Create at: ${('0' + createDate.getHours()).slice(-2)}:${('0' + createDate.getMinutes()).slice(-2)}
       ( ${('0' + (createDate.getMonth() + 1)).slice(-2)} / ${('0' + createDate.getDate()).slice(-2)} )</p>
      <button class='trash-btn'>
      <img class='trash-img trash-img-todo' src='${trashIcon}'>
      </button>
      </div>
      `;
      return listItem;
    } else {
      listItem.innerHTML = `
      <div class='task todo-task' data-id='${data.id}' data-status='${data.status}'>
      <h3 class='task-title'>${data.title}</h3>
      <p class='create-date'>Create at: ${('0' + createDate.getHours()).slice(-2)}:${('0' + createDate.getMinutes()).slice(-2)}
       ( ${('0' + (createDate.getMonth() + 1)).slice(-2)} / ${('0' + createDate.getDate()).slice(-2)} )</p>
      <p class='update-date'>Update at: ${('0' + updateDate.getHours()).slice(-2)}:${('0' + updateDate.getMinutes()).slice(-2)}
       ( ${('0' + (updateDate.getMonth() + 1)).slice(-2)} / ${('0' + updateDate.getDate()).slice(-2)} )</p>
      <button class='trash-btn'>
      <img class='trash-img trash-img-todo' src='${trashIcon}'>
      </button>
      </div>
      `;
      return listItem;
    }
  };

  generateUpdateModal(data) {
    if (data) {
      this.updateModal.innerHTML = `
      <div class='modal-update' data-id='${data.id}' data-status='${data.status}'>
      <h3 class='modal-title'>Update</h3>
      <input class='input-title' type='text' value='${data.title}'>
      <p class='create-at'></p>
      <p class='update-at'></p>
      <select class='input-status' id='status' name='status'>
      <option value="todo">To-do</option>
      <option value="inprogress">In-Progress</option>
      <option value="done">Done</option>
      </select>
      <button class='btn-modal btn-cancel'>Cancel</button>
      <button class='btn-modal btn-confirm'>Confirm</button>
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
      <select class='input-status' id='status' name='status'>
      <option value="todo">To-do</option>
      <option value="inprogress">In-Progress</option>
      <option value="done">Done</option>
      </select>
      <button class='btn-modal btn-cancel'>Cancel</button>
      <button class='btn-modal btn-confirm'>Add</button>
      </div>
      `;
      const inputStatus = document.querySelector('.input-status');
      inputStatus.value = 'todo';
      return this.updateModal;
    }
  };

  openUpdateModal(e) {
    // Get exactly data of clicked from Model
    const taskId = e.target.getAttribute('data-id');
    const taskStatus = e.target.getAttribute('data-status');
    const taskItem = this.controller.model.getData(taskId, taskStatus)

    this.generateUpdateModal(taskItem);
    this.updateModal.classList.add('show');
    const btnConfirm = document.querySelector('.btn-confirm');
    btnConfirm.addEventListener('click', (e) => {

      const modal = e.target.parentNode;
      const inputTitle = modal.querySelector('.input-title');
      const inputStatus = modal.querySelector('.input-status');
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

    const btnCancel = document.querySelector('.btn-cancel');
    btnCancel.addEventListener('click', (e) => {
      this.updateModal.classList.remove('show');
    })
  };

  generateConfirmModal(element) {
    this.confirmModal.innerHTML = `
    <div class='modal-confirm' data-id='${element.getAttribute('data-id')}'>
    <h3 class='modal-title'>Delete this Task?</h3>
    <button class='btn-modal btn-cancel-delete'>Cancel</button>
    <button class='btn-modal btn-confirm-delete'>Confirm</button>
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
      const taskList = document.querySelectorAll('.todo-task');
      for (let index = 0; index < taskList.length; index++) {
        if (trashBtn.parentNode == taskList[index]) {
          const dataId = taskList[index].getAttribute('data-id');
          const dataStatus = taskList[index].getAttribute('data-status');
          this.controller.deleteData(dataId, dataStatus);
        }
      }
      this.confirmModal.classList.remove('show');
    });
  };

  update(data) {
    this.render(data);
  };
}

export { TodoView };
