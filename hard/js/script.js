class Todo {
  constructor(form, input, todoList, todoCompleted) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
  }

  addToStorage() {
    localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
  }

  render() {
    this.todoCompleted.textContent = ``;
    this.todoList.textContent = ``;
    this.todoData.forEach(this.createItem, this);
    this.addToStorage();
  }

  createItem(todo) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.key = todo.key;
    li.insertAdjacentHTML('beforeend', `
      <span class="text-todo">${todo.value}</span>
      <div class="todo-buttons">
        <button class="todo-edit"></button>
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
      </div>
    `);

    if (todo.completed) {
      this.todoCompleted.append(li);
    } else {
      this.todoList.append(li);
    }
  }

  addTodo(e) {
    e.preventDefault();
    if (this.input.value.trim()) {
      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey()
      };
      this.todoData.set(newTodo.key, newTodo);
      this.render();
      this.input.value = ``;
    } else {
      alert('Невозможно создать пустое дело');
    }
  }

  generateKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  deleteItem(target) {
    const todoItemDel = document.querySelectorAll('.todo-remove');
    todoItemDel.forEach(item => {
      if (item === target) {
        const key = target.closest('.todo-item').key;
        target.closest('.todo-item').remove();
        this.todoData.delete(key);
        this.render();
      }
    });
  }

  completedItem(target) {
    const todoItemComplete = document.querySelectorAll('.todo-complete');
    todoItemComplete.forEach(item => {
      if (item === target) {
        if (this.todoData.get(target.closest('.todo-item').key).completed) {
          this.todoData.get(target.closest('.todo-item').key).completed = false;
          this.todoList.append(target.closest('.todo-item'));
        } else {
          this.todoData.get(target.closest('.todo-item').key).completed = true;
          this.todoCompleted.append(target.closest('.todo-item'));
        }
        this.render();
      }
    });
  }

  editItem(target) {
    let currentEl,
      oldItemValue;
    const todoItemEdit = document.querySelectorAll('.todo-edit');
    const keyInput = () => {
      if (event.keyCode === 13) {
        event.preventDefault();
        const editedItem = this.todoData.get(currentEl.key);
        editedItem.value = currentEl.closest('.todo-item').querySelector('.text-todo').textContent;
        if (editedItem.value === '') {
          alert('Дело не должно быть пустым!');
          editedItem.value = oldItemValue;
        }
        this.render();
      }
    };
    todoItemEdit.forEach(item => {
      if (item === target) {
        if (target.closest('.todo-item').getAttribute('contenteditable') === 'true') {
          this.render();
        } else {
          currentEl = item.closest('.todo-item');
          oldItemValue = currentEl.closest('.todo-item').querySelector('.text-todo').textContent;
          target.closest('.todo-item').addEventListener('keydown', keyInput);
          target.closest('.todo-item').setAttribute('contenteditable', true);
        }
      }
    });
  }

  handler() {
    document.documentElement.addEventListener('click', () => {
      const target = event.target;
      switch (target) {
      case document.querySelector('.todo-remove'):
        this.deleteItem(target);
        break;
      case document.querySelector('.todo-complete'):
        this.completedItem(target);
        break;
      case document.querySelector('.todo-edit'):
        this.editItem(target);
        break;
      case document.querySelector('.text-todo'):
        break;
      default:
        this.render();
        break;
      }
    });
  }

  init() {
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.render();
    this.handler();
  }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();
