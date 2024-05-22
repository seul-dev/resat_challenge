import TodoInputForm from './TodoInputForm.js';
import TodoList from './TodoList.js';
import TodoFilter from './TodoFilter.js';
import { Filter } from './constants.js';

function App({ $target, initialState }) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    todoList.setState(this.state);
  };

  const todoInputForm = new TodoInputForm({
    $target,
    onSubmit: ({ text, priority }) => {
      // todoInputForm에서 받아온 데이터를 state에 추가
      const nextState = [
        ...this.state,
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
      const newState = Filter[filterName].filterFunc(this.state);
      todoList.setState(newState);
    },
  });

  const todoList = new TodoList({
    $target,
    initialState: this.state,
    onToggle: (id) => {
      const nextState = this.state.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );
      this.setState(nextState);
    },
    onEdit: (id) => {
      const nextState = this.state.map((todo) =>
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
