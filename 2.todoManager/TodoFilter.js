import { Filter } from './constants.js';

export default function TodoFilter({ $target, initialState, onChange }) {
  this.$element = document.createElement('nav');
  this.$element.className = 'todo-filter';

  this.state = initialState;

  this.render = () => {
    this.$element.innerHTML = Object.entries(Filter)
      .map(
        ([filterKey, filter]) =>
          `<button data-filter-name='${filterKey}' class='${
            this.state === filterKey ? 'selected' : ''
          }'>
            ${filter.label}
          </button>`
      )
      .join('');
  };

  $target.appendChild(this.$element);

  this.render();

  this.$element.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const { filterName } = e.target.dataset;
      this.state = filterName;
      this.render();
      onChange(filterName);
    }
  });
}
