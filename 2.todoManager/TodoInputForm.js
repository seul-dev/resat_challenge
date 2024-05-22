import { PRIORITY } from './constants.js';

export default function TodoInputForm({ $target, onSubmit }) {
  this.$element = document.createElement('div');
  this.$element.className = 'todo-form';

  this.render = () => {
    this.$element.innerHTML = `
    <form>
      <input type="text" id='todo-text' placeholder="할 일을 작성해주세요.">
      <button type='submit'>추가</button>
      <div class="priority">
         ${Object.entries(PRIORITY)
           .map(
             ([value, label], index) =>
               `<div>
                <input type="radio" id="${value}" name="priority" value="${value}" ${
                 index === 0 ? 'checked' : ''
               }>
                <label for="${value}">${label}</label>
              </div>`
           )
           .join('')}  
      </div>
    </form>
    `;
  };

  $target.appendChild(this.$element);

  this.render();

  this.$element.addEventListener('submit', (e) => {
    e.preventDefault();

    const $textInput = e.target.querySelector('#todo-text');
    const $priorityInput = e.target.querySelector(
      'input[name="priority"]:checked'
    );

    // 유효성 검사
    if ($textInput.value.trim() === '') {
      alert('할 일을 입력해주세요.');
      $textInput.focus();
      return;
    }

    // onSubmit 콜백 호출 (새로운 할 일 추가)
    onSubmit({
      text: $textInput.value,
      priority: $priorityInput.value,
    });

    // 입력창 초기화
    $textInput.value = '';
    $textInput.focus();

    $priorityInput.checked = false;
    const $lowPriorityRadio = e.target.querySelector(
      'input[name="priority"][value="low"]'
    );
    $lowPriorityRadio.checked = true;
  });
}
