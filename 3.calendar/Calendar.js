export default function Calendar({
  $target,
  initialState,
  onSelectDate,
  memos,
}) {
  this.state = initialState;
  this.$element = document.createElement('div');
  this.$element.id = 'calendar';
  $target.appendChild(this.$element);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const DAY_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'];

  this.render = () => {
    const monthStart = new Date(this.state.year, this.state.month);
    const monthEnd = new Date(this.state.year, this.state.month + 1, 0);
    const startDay = monthStart.getDay();
    const endDay = monthEnd.getDate();

    let html = `<div id='calendar-head'><div id="prev">◀︎</div><div>${this.state.year}월 ${this.state.month}일</div><div id="next">►</div></div><table><tr>`;

    html += `${DAY_OF_WEEK.map((day) => `<th>${day}</th>`).join('')}</tr><tr>`;

    for (let i = 0; i < startDay; i++) {
      html += '<td></td>';
    }

    for (let i = 1; i <= endDay; i++) {
      const date = `${this.state.year}-${this.state.month}-${i}`;
      const hasMemo = memos[date] ? ' has-memo' : '';
      html += `<td class="day${hasMemo}" data-date="${date}">${i}</td>`;
      if ((i + startDay) % 7 === 0) {
        html += '</tr><tr>';
      }
    }

    html += '</tr></table>';

    this.$element.innerHTML = html;
  };

  this.render();

  this.$element.addEventListener('click', (e) => {
    if (e.target.classList.contains('day')) {
      this.state.selectedDate = e.target.dataset.date;
      this.setState({ ...this.state });
      onSelectDate(this.state.selectedDate);
    } else if (e.target.id === 'prev') {
      this.setState({
        year: this.state.month === 1 ? this.state.year - 1 : this.state.year,
        month: this.state.month === 1 ? 12 : this.state.month - 1,
      });
    } else if (e.target.id === 'next') {
      this.setState({
        year: this.state.month === 12 ? this.state.year + 1 : this.state.year,
        month: this.state.month === 12 ? 1 : this.state.month + 1,
      });
    }
  });
}
