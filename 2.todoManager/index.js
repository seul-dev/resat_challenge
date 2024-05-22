import TodoInputForm from './TodoInputForm.js';

function App({ $target, initialState }) {
  this.state = [];

  const todoInputForm = new TodoInputForm({
    $target,
    onSubmit: ({ text, priority }) => {
      // todoInputForm에서 받아온 데이터를 state에 추가
    },
  });
}

const $target = document.getElementById('app');
new App({ $target, initialState: [] });
