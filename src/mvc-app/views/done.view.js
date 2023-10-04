import Observer from './observer.js';
import trashIcon from '../../assets/images/trash.svg';

class DoneView extends Observer {
  constructor(controller) {
    super();
    this.controller = controller;

    // Define required elements's node in DOM
    this.updateModal = document.querySelector('.modal-update-wrapper');
    this.doneList = document.querySelector('.done-list');
    this.confirmModal = document.querySelector('.modal-confirm-wrapper');
    this.btnAdd = document.querySelector('.img-add-done');

    // Open modal when click add button
    this.btnAdd.addEventListener('click', (event) => { this.openUpdateModal(event) });

    // Render current tasks when load page
    window.addEventListener('load', () => {
      this.render(this.controller.readData());
    });

    this.controller.model.addObserver(this);
  }


  render(data) {
    this.doneList.innerHTML = '';
    for (const key in data) {
      // Define done array
      if (key == 'done') {
        let dataArray = data[key];
        // Get each object in todo Array
        for (let index = 0; index < dataArray.length; index++) {
          const dataItem = dataArray[index];
          // Assign object to generate task method
          this.doneList.appendChild(this.generateTask(dataItem));
        }

        // Open update modal when click on Task
        const listItem = document.querySelectorAll('.done-task');
        for (const item of listItem) {
          item.addEventListener('click', (event) => {
            if (event.target == item) {
              this.openUpdateModal(event);
            }
          });
        }

        // Open confirm modal when click trash button
        const trashBtnList = document.querySelectorAll('.trash-img-done');
        for (const trashBtn of trashBtnList) {
          trashBtn.addEventListener('click', (event) => {
            this.openConfirmModal(event);
          });
        }
      }
    }
  }


  generateTask(data) {
    // Convert DateString to Date
    const createDate = new Date(data.createDate);
    const updateDate = new Date(data.updateDate);

    const listItem = document.createElement('li');
    if (data.createDate === data.updateDate) {
      listItem.innerHTML = `
      <div class='task done-task' data-id='${data.id}' data-status='${data.status}'>
        <div>
          <h3 class='task-title'>${data.title}</h3>
          <p class='task-date create-date'>Create at: ${('0' + createDate.getHours()).slice(-2)}:${('0' + createDate.getMinutes()).slice(-2)}
          ( ${('0' + (createDate.getMonth() + 1)).slice(-2)} / ${('0' + createDate.getDate()).slice(-2)} )</p>
          </div>
          <button class='trash-btn'>
            <img class='trash-img trash-img-done' src='${trashIcon}'>
          </button>
      </div>
      `;
      return listItem;
    } else {
      listItem.innerHTML = `
      <div class='task done-task' data-id='${data.id}' data-status='${data.status}'>
        <div>
          <h3 class='task-title'>${data.title}</h3>
          <p class='task-date create-date'>Create at: ${('0' + createDate.getHours()).slice(-2)}:${('0' + createDate.getMinutes()).slice(-2)}
          ( ${('0' + (createDate.getMonth() + 1)).slice(-2)} / ${('0' + createDate.getDate()).slice(-2)} )</p>
          <p class='task-date update-date'>Update at: ${('0' + updateDate.getHours()).slice(-2)}:${('0' + updateDate.getMinutes()).slice(-2)}
          ( ${('0' + (updateDate.getMonth() + 1)).slice(-2)} / ${('0' + updateDate.getDate()).slice(-2)} )</p>
        </div>
        <button class='trash-btn'>
          <img class='trash-img trash-img-done' src='${trashIcon}'>
        </button>
      </div>
      `;
      return listItem;
    }
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
      inputStatus.value = 'done';
      return this.updateModal;
    }
  }


  generateConfirmModal(element) {
    this.confirmModal.innerHTML = `
    <div class='modal-confirm' data-id='${element.getAttribute('data-id')}'>
      <h3 class='modal-title modal-confirm-title'>Delete this Task?</h3>
      <button class='btn-modal btn-cancel-delete'>Cancel</button>
      <button class='btn-modal btn-confirm-delete'>Confirm</button>
    </div>
    `;
    return this.confirmModal;
  }


  openUpdateModal(event) {
    const taskId = event.target.getAttribute('data-id');
    const taskStatus = event.target.getAttribute('data-status');
    const taskItem = this.controller.model.getData(taskId, taskStatus);

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

  
  openConfirmModal(event) {
    // Define task element to set data-id for confirm modal
    // Then assign task's id for Modal's attribute (*data-id*)
    const trashBtn = event.target.parentNode;
    this.generateConfirmModal(trashBtn.parentNode);
    this.confirmModal.classList.add('show');

    // Hide modal when click Cancel
    const btnCancelDelete = document.querySelector('.btn-cancel-delete');
    btnCancelDelete.addEventListener('click', () => {
      this.confirmModal.classList.remove('show');
    });

    // Compare data-id of modal with task'id in a NodeList
    // If true -> call deleteData to remove Task
    // Finally hide modal
    const btnConfirmDelete = document.querySelector('.btn-confirm-delete');
    btnConfirmDelete.addEventListener('click', () => {
      const taskList = document.querySelectorAll('.done-task');
      for (let index = 0; index < taskList.length; index++) {
        if (trashBtn.parentNode == taskList[index]) {
          const dataId = taskList[index].getAttribute('data-id');
          const dataStatus = taskList[index].getAttribute('data-status');
          this.controller.deleteData(dataId, dataStatus);
        }
      }
      this.confirmModal.classList.remove('show');
    });
  }


  update(data) {
    this.render(data);
  };
}

export { DoneView };
