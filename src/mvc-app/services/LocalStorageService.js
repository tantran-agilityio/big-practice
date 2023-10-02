class LocalStorageService {

  saveToLocal(taskList) {
    localStorage.setItem('taskDatas', JSON.stringify(taskList));
  }

  getFromLocal() {
    return JSON.parse(localStorage.getItem('taskDatas') || {});
  }
  
}

export { LocalStorageService };
