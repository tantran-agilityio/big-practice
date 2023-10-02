import { TaskModel } from "./models/task.model.js";
import { TaskController, TaskController } from "./controllers/task.controller";
import { TodoView } from "./views/todo.view.js";
import { InprogressView } from "./views/inprogress.view.js";
import { DoneView } from "./views/done.view.js";

function main() {
  let taskModel = new TaskModel();
  let taskController = new TaskController(taskModel);
  let todoView = new TodoView(taskController);
  let inprogressView = new InprogressView(taskController);
  let doneView = new DoneView(taskController);
}

main();
