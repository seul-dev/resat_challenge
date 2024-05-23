import Calendar from './Calendar.js';
import Memo from './Memo.js';

function App({ $target }) {
  this.currentDate = new Date();
  this.currentYear = this.currentDate.getFullYear();
  this.currentMonth = this.currentDate.getMonth() + 1;
  this.currentDay = this.currentDate.getDate();
  this.memos = {};

  const calendar = new Calendar({
    $target,
    initialState: { year: this.currentYear, month: this.currentMonth },
    onSelectDate: (date) => {
      const memo = this.memos[date];
      memoComponent.setState({ date, memo });
    },
    memos: this.memos,
  });

  const memoComponent = new Memo({
    $target,
    initialState: { date: null, memo: null },
    onEdit: (text) => {
      this.memos[calendar.state.selectedDate] = text;
      calendar.setState({ ...calendar.state });
    },
  });
}

const $target = document.getElementById('app');
new App({ $target });
