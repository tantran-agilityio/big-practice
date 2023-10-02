import Observer from './observer.js';
class DoneView extends Observer {
  constructor(controller) {
    super();
    this.controller = controller;


    this.controller.model.addObserver(this);
  }
}

export { DoneView };
