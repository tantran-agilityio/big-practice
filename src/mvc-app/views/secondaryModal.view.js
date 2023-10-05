import Observer from './observer.js';

class SecondaryModalView extends Observer {
  constructor(taskController) {
    super();
    this.taskController = taskController;
    this.addModalView = addModalView;
    this.updateModalView = updateModalView;
    this.confirmModalView = confirmModalView;
    this.status = status;

    this.taskController.model.addObserver(this);
  }


  update() { }
}

export { SecondaryModalView };
