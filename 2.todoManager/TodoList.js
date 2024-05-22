import { PRIORITY } from './constants.js';

export default function TodoList({ $target, initialState, onToggle, onEdit }) {
  this.$element = document.createElement('ul');
  this.$element.className = 'todo-list';
  $target.appendChild(this.$element);

  this.state = initialState;

  this.render = () => {
    this.$element.innerHTML = this.state
      .map(
        ({ text, priority, id, isCompleted }) =>
          `<li data-index='${id}' class='todo-item'>
            <input type='checkbox' ${isCompleted ? 'checked' : ''} >
            <span class='todo-text'>${text}</span>
            <span class='todo-priority' data-priority='${priority}'>${
            PRIORITY[priority]
          }</span>
          </li>`
      )
      .join('');
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render();

  // onToggle, onEdit 콟백 등록
  this.$element.addEventListener('click', (e) => {
    const $todoItem = e.target.closest('li');
    if ($todoItem) {
      const { index } = $todoItem.dataset;
      const todo = this.state.find((todo) => todo.id === index);

      if (e.target.tagName === 'INPUT') {
        onToggle(todo.id);
      } else {
        onEdit(todo.id);
      }
    }
  });
}
