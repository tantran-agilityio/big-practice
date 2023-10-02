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
  }

  render(data) {
    // const todoList = document.querySelector('.todo-list');
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
          // listItem.addEventListener('click', (e) => {
          //   if (e.target == listItem.firstElementChild) {
          //     this.openUpdateModal(e);
          //   }
          // });
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

  // const trashBtnList = document.querySelectorAll('.trash-img');
  // console.log(trashBtnList);

  generateTask(data) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
    <div class='task todo-task' data-id='${data.id}' data-status='${data.status}'>
    <h3>${data.title}</h3>
    <button>
    <img class='trash-img-todo' src='${trashIcon}'>
    </button>
    </div>
    `;
    return listItem;
  };

  generateUpdateModal(element) {

    this.updateModal.innerHTML = `
    <div class='modal-update' data-id='${element.getAttribute('data-id')}' data-status='${element.getAttribute('data-status')}'>
    <h3 class='modal-update-title'>Add new task or Update Task</h3>
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
    <button class='btn-confirm'>Confirm</button>
    </div>
    `;
    return this.updateModal;
  }

  openUpdateModal(e) {
    // Get exactly data of clicked from Model
    // const taskId = e.target.getAttribute('data-id');
    // const taskStatus = e.target.getAttribute('data-status');
    // const taskItem = this.controller.model.getData(taskId, taskStatus);

    this.generateUpdateModal(e.target);
    this.updateModal.classList.add('show');
    const btnConfirm = document.querySelector('.btn-confirm');
    btnConfirm.addEventListener('click', (e) => {
      const modal = e.target.parentNode;
      const inputTitle = modal.querySelector('.input-title');
      const inputStatus = modal.querySelector('.input-status');
      const dataId = modal.getAttribute('data-id');
      const dataStatus = modal.getAttribute('data-status');
      // this.controller.addNewData(inputTitle.value, inputStatus.value);
      this.updateModal.classList.remove('show');
      if (dataId == 'null') {
        this.controller.addNewData(inputTitle.value, inputStatus.value);
      } else {
        this.controller.updateData(dataId, dataStatus);
      }
    });

    const btnCancel = document.querySelector('.btn-cancel');
    btnCancel.addEventListener('click', (e) => {
      this.updateModal.classList.remove('show');
    })
  }

  generateConfirmModal(element) {
    this.confirmModal.innerHTML = `
    <div class='modal-confirm' data-id='${element.getAttribute('data-id')}'>
    <h3 class='modal-confirm-title'>Delete this Task?</h3>
    <button class='btn-cancel-delete'>Cancel</button>
    <button class='btn-confirm-delete'>Confirm</button>
    </div>
    `;
    return this.confirmModal;
  }

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
      // const dataId = trashBtn.parentNode.getAttribute('data-id');
      // this.controller.deleteData(dataId);
      // console.log(trashBtn.parentNode);

      // console.log(trashBtn.parentNode);

      const taskList = document.querySelectorAll('.todo-task');

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

export { TodoView };
