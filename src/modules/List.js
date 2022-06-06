/* Class for initializing empty array of todo list */
export default class List {
  constructor() {
    this.todoList = [];
  }

  /* Get list from local storage. if there is any value return it other
  wise return a empty array */

  getList = () => {
    const list = JSON.parse(localStorage.getItem('todoList'));
    if (list) {
      return list;
    }
    return [];
  };

  /* Add data to local stroage by the name of todoList but change it to string
  as local storage work with string and we are passing object */
  addList = (todoListData) => {
    localStorage.setItem('todoList', JSON.stringify(todoListData));
  };

  /* From list based on index  */
  deleteList = (index) => {
    if (index !== null) {
      const list = this.getList();
      const listRemoved = list.filter((item, key) => {
        if (key !== index) {
          return true;
        }
        return null;
      });
      this.addList(listRemoved);
      this.arrangeStorage();
    }
  };

  /* Remove those  items whose status is changed  to completed
  This will clear all those whose status is complated.
  */
  clearCompleted = () => {
    const lists = this.getList();
    const listRemoved = lists.filter((item) => {
      if (item.completed) {
        return null;
      }
      return item;
    });
    this.addList(listRemoved);
    this.arrangeStorage();
  };

  /* When items are removed the rest should start from first index */

  arrangeStorage = () => {
    const lists = this.getList();
    let index = 1;
    lists.forEach((list) => {
      list.index = index;
      index += 1;
    });
    this.addList(lists);
  };

  /* Edit Description */

  editTask = (index, value) => {
    const lists = this.getList();
    lists[index].description = value;
    this.addList(lists);
  };

  reOrder = (newOrder) => {
    const newArray = [];
    const prevArray = this.getList();
    for (let i = 0; i < prevArray.length; i += 1) {
      newArray[i] = prevArray[newOrder[i]];
    }
    this.addList(newArray);
    this.arrangeStorage();
  };
}
