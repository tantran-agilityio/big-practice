import Observer from './observer.js';
import trashIcon from '../../assets/images/trash.svg';

class ColumnView extends Observer {
  constructor(taskController, status) {
    super();
    this.taskController = taskController;
    this.status = status;

    // Define required element's nodes in DOM
    this.column = document.querySelector(`.${this.status}-list`);
    this.btnAdd = document.querySelector(`.img-add-${this.status}`);

    // Open add Modal when click add button
    this.btnAdd.addEventListener("click", () => {
      this.taskController.openAddModal(this.status);
    });

    // Render current tasks from Local Storage when load page
    window.addEventListener('load', async () => {
      // console.log(await this.taskController.readData(this.status));
      this.render(await this.taskController.readData(), this.status);
    });

    this.taskController.model.addObserver(this);
  }


  render(data, status) {
    // Reset layout
    this.column.innerHTML = "";

    // Get each object for render Tasks
    const statusArray = data[status];
    for (let index = 0; index < statusArray.length; index++) {
      const taskObject = statusArray[index];
      const taskItem = this.column.appendChild(this.generateTask(taskObject));
      const trashBtn = taskItem.lastElementChild.lastElementChild.firstElementChild;

      // Open update Modal when click on Tasks
      taskItem.addEventListener("click", (event) => {
        if (event.target !== trashBtn) {
          this.taskController.openUpdateModal(taskObject);
        } else {
          const task = trashBtn.parentNode.parentNode;
          this.taskController.openConfirmModal(task);
        }
      });
    }

    // Render counter for status column
    const taskCounter = document.querySelector(`.${status}-counter`);
    if (statusArray.length != 0) {
      taskCounter.innerText = `( ${statusArray.length} )`;
    } else {
      taskCounter.innerText = '';
    }
  }


  generateTask(data) {
    // Convert Date-String to Date
    const createDate = new Date(data.createDate);
    const updateDate = new Date(data.updateDate);

    const listItem = document.createElement("li");
    if (data.createDate === data.updateDate) {
      listItem.innerHTML = `
      <div class='task ${data.status}-task' data-id='${data.id}' data-status='${data.status}'>
        <div>
          <h3 class='task-title'>${data.title}</h3>
          <p class='task-date create-date'>Create at: ${("0" + createDate.getHours()).slice(-2)}:${("0" + createDate.getMinutes()).slice(-2)}
           ( ${("0" + (createDate.getMonth() + 1)).slice(-2)} / ${("0" + createDate.getDate()).slice(-2)} )</p>
        </div>
        <button class='trash-btn'>
          <img class='trash-img trash-img-${data.status}' src='${trashIcon}'>
        </button>
      </div>`;
      return listItem;
    } else {
      listItem.innerHTML = `
      <div class='task ${data.status}-task' data-id='${data.id}' data-status='${data.status}'>
        <div>
          <h3 class='task-title'>${data.title}</h3>
          <p class='task-date create-date'>Create at: ${("0" + createDate.getHours()).slice(-2)}:${("0" + createDate.getMinutes()).slice(-2)}
           ( ${("0" + (createDate.getMonth() + 1)).slice(-2)} / ${("0" + createDate.getDate()).slice(-2)} )</p>
          <p class='task-date update-date'>Update at: ${("0" + updateDate.getHours()).slice(-2)}:${("0" + updateDate.getMinutes()).slice(-2)}
           ( ${("0" + (updateDate.getMonth() + 1)).slice(-2)} / ${("0" + updateDate.getDate()).slice(-2)} )</p>
        </div>
        <button class='trash-btn'>
          <img class='trash-img trash-img-${data.status}' src='${trashIcon}'>
        </button>
      </div>`;
      return listItem;
    }
  }


  update(data) {
    // Do not listen to notifies of actions - just listen to notify(model)
    if (!data.hasOwnProperty("action")) {
      this.render(data, this.status);
    }
  }
}

export { ColumnView };
