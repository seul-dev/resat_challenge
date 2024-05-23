import TodoInputForm from './TodoInputForm.js';
import TodoList from './TodoList.js';
import TodoFilter from './TodoFilter.js';
import { Filter } from './constants.js';

function App({ $target, initialState }) {
  this.todos = initialState;

  this.setState = (nextState) => {
    this.todos = nextState;
    todoList.setState(this.todos);
  };

  const todoInputForm = new TodoInputForm({
    $target,
    onSubmit: ({ text, priority }) => {
      // todoInputForm에서 받아온 데이터를 state에 추가
      const nextState = [
        ...this.todos,
        {
          id: crypto.randomUUID(),
          text,
          priority,
          isCompleted: false,
        },
      ];
      this.setState(nextState);
    },
  });

  const todoFilter = new TodoFilter({
    $target,
    initialState: 'all',
    onChange: (filterName) => {
      const newState = Filter[filterName].filterFunc(this.todos);
      todoList.setState(newState);
    },
  });

  const todoList = new TodoList({
    $target,
    initialState: this.todos,
    onToggle: (id) => {
      const nextState = this.todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );
      // Todo: filter 상태에 따라서 필터링된 상태로 업데이트 시키도록 수정
      this.setState(nextState);
    },
    onEdit: (id) => {
      const nextState = this.todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: prompt('수정할 내용을 입력하세요', todo.text) }
          : todo
      );
      this.setState(nextState);
    },
  });
}

const $target = document.getElementById('app');
new App({ $target, initialState: [] });
