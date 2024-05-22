export const PRIORITY = {
  low: '낮음',
  medium: '보통',
  high: '높음',
  'very-high': '아주 높음',
};

export const Filter = {
  all: {
    label: '전체',
    filterFunc: (todos) => todos,
  },
  active: {
    label: '진행중',
    filterFunc: (todos) => todos.filter((todo) => !todo.isCompleted),
  },
  completed: {
    label: '완료',
    filterFunc: (todos) => todos.filter((todo) => todo.isCompleted),
  },
};
