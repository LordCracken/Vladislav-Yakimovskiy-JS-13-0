'use strict';

const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoItem = document.querySelector('.todo-item'),
  todoCompleted = document.querySelector('.todo-completed');

const todoData = JSON.parse(localStorage.getItem('data'));

const render = () => {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = `<span class="text-todo">${item.value}</span>
    <div class="todo-buttons">
      <button class="todo-remove"></button>
      <button class="todo-complete"></button>
    </div>`;

    const todoComplete = li.querySelector('.todo-complete'),
      todoRemove = li.querySelector('.todo-remove');
    todoComplete.addEventListener('click', () => {
      item.completed = !item.completed;
      render();
    });
    todoRemove.addEventListener('click', () => {
      const todoButtons = todoRemove.parentNode;
      todoData.splice(item, 1);
      localStorage.setItem('data', JSON.stringify(todoData));
      return item.completed ? todoCompleted.removeChild(todoButtons.parentNode) : todoList.removeChild(todoButtons.parentNode);
    });

    localStorage.setItem('data', JSON.stringify(todoData));

    return item.completed ? todoCompleted.append(li) : todoList.appendChild(li);
  });
};

todoControl.addEventListener('submit', (event) => {
  event.preventDefault();

  const newTodo = {
    value: headerInput.value,
    completed: false
  };

  if (newTodo.value !== '') {
    todoData.push(newTodo);
    headerInput.value = '';
  }

  localStorage.setItem('data', JSON.stringify(todoData));

  render();
});

render();