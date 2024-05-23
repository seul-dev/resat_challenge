export default function Memo({ $target, initialState, onEdit }) {
  this.state = initialState;
  this.$element = document.createElement('dialog');
  $target.appendChild(this.$element);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.$element.addEventListener('submit', (e) => {
    e.preventDefault();
    const memo = e.target.querySelector('textarea').value;
    onEdit(memo);
  });

  this.$element.addEventListener('click', (e) => {
    if (e.target.matches('.close')) {
      this.$element.close();
    }
  });

  this.render = () => {
    this.$element.innerHTML = `
      <form>
        <textarea>${this.state.memo || ''}</textarea>
        <button type="submit">Save</button>
        <button type="button" class="close">Close</button>
      </form>
    `;

    if (this.state.memo !== null) {
      this.$element.showModal();
    } else {
      this.$element.close();
    }
  };

  this.render();
}
