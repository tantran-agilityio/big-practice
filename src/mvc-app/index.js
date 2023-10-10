import { TaskModel } from "./models/task.model.js";
import { TaskController, TaskController } from "./controllers/task.controller";
import { ColumnView } from "./views/column.view.js";
import { TaskModalView } from "./views/task-modal.view.js";
import { ConfirmModalView } from "./views/confirm-modal.view.js";

function main() {
  let taskModel = new TaskModel();
  let taskController = new TaskController(taskModel);

  // Column's Views
  let todoView = new ColumnView(taskController, 'todo');
  let inprogressView = new ColumnView(taskController, 'inprogress');
  let doneView = new ColumnView(taskController, 'done');

  // Modal's Views
  let addAndUpdateModalView = new TaskModalView(taskController);
  let confirmModalView = new ConfirmModalView(taskController);

  // Render current tasks from Local Storage when load page
  // window.addEventListener("load", async () => {
	// 	taskController.readData();
  // });
}

main();
