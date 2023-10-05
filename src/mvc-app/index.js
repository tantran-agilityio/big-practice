import { TaskModel } from "./models/task.model.js";
import { TaskController } from "./controllers/task.controller";
import { PrimaryModalView } from "./views/primaryModal.view.js";
import { SecondaryModalView } from "./views/secondaryModal.view.js";
import { ColumnView } from "./views/column.view.js";

function main() {
  let taskModel = new TaskModel();
  let taskController = new TaskController(taskModel);

  // Modals View
  // let addModalView = new PrimaryModalView(taskController);
  // let updateModalView = new PrimaryModalView(taskController);

  let editModalView = new PrimaryModalView(taskController);
  let confirmModalView = new SecondaryModalView(taskController);

  // Column View
  let todoView = new ColumnView(taskController, editModalView, confirmModalView, 'todo');
  let inprogressView = new ColumnView(taskController, editModalView, confirmModalView, 'inprogress');
  let doneView = new ColumnView(taskController, editModalView, confirmModalView, 'done');
}

main();
