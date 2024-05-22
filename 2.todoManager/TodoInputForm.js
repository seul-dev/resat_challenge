// export default function TodoInputForm({ $target, onSubmit }) {
//   this.$element = document.createElement('div');

//   this.render = () => {
//     this.$element.innerHTML = `
//       <form>
//         <input type="text" placeholder="할 일을 입력하세요.">
//         <button>추가</button>
//       </form>
//       <button class="RemoveAllButton">전체 삭제</button>
//     `;
//   };

//   $target.appendChild(this.$element);

//   this.render();

//   this.$element.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const $input = e.target.querySelector('input');

//     onSubmit($input.value);

//     $input.value = '';
//     $input.focus();
//   });

//   this.$element
//     .querySelector('.RemoveAllButton')
//     .addEventListener('click', () => {
//       window.dispatchEvent(new CustomEvent(REMOVE_ALL));
//     });
// }

export default function TodoInputForm({ $target, onSubmit }) {
  this.$element = document.createElement('div');
  this.$element.className = 'todo-form';

  this.render = () => {
    this.$element.innerHTML = `
    <form>
      <input type="text" id='todo-text' placeholder="할 일을 작성해주세요.">
      <button type='submit'>추가</button>
      <div class="priority">
        <div>
          <input type="radio" id="low" name="priority" value="low" checked>
          <label for="low">Low</label>
        </div>
        <div>
          <input type="radio" id="medium" name="priority" value="medium">
          <label for="medium">Medium</label>
        </div>
        <div>
          <input type="radio" id="high" name="priority" value="high">
          <label for="high">High</label>
        </div>
        <div>
          <input type="radio" id="very-high" name="priority" value="very-high">
          <label for="very-high">Very High</label>
        </div>
      </div>
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
