let intervalId;
let timeLeft;
let isPaused = false;

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const timerDisplay = document.getElementById('timer-display');
const inputArea = document.getElementById('input-area');

inputArea.style.display = 'block';
timerDisplay.textContent = '00:00:00';

function updateTimerDisplay(hours = 0, minutes = 0, seconds = 0) {
  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');

  timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

function handleInputChange() {
  let hours = hoursInput.value || 0;
  let minutes = minutesInput.value || 0;
  let seconds = secondsInput.value || 0;
  startButton.disabled = !(hours || minutes || seconds);

  updateTimerDisplay(hours, minutes, seconds);
}

function updateTime() {
  if (timeLeft > 0) {
    timeLeft--;
    let hoursLeft = Math.floor(timeLeft / 3600);
    let minutesLeft = Math.floor((timeLeft % 3600) / 60);
    let secondsLeft = timeLeft % 60;

    updateTimerDisplay(hoursLeft, minutesLeft, secondsLeft);
  }

  if (timeLeft <= 0) {
    clearInterval(intervalId);
    intervalId = null;
    timerDisplay.textContent = "Time's up!";
    startButton.disabled = true;
    stopButton.disabled = true;
    resetButton.disabled = true;
    hoursInput.value = '';
    minutesInput.value = '';
    secondsInput.value = '';
    inputArea.style.display = 'block';
    isPaused = false;
  }
}

function startTimer() {
  let hours = parseInt(hoursInput.value) || 0;
  let minutes = parseInt(minutesInput.value) || 0;
  let seconds = parseInt(secondsInput.value) || 0;

  if (!isPaused) {
    timeLeft = hours * 3600 + minutes * 60 + seconds;
  }

  inputArea.style.display = 'none';
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = false;

  intervalId = setInterval(updateTime, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
  isPaused = true;
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;
}

function resetTimer() {
  clearInterval(intervalId);
  timeLeft = 0;
  isPaused = false;
  updateTimerDisplay(0, 0, 0);
  hoursInput.value = '';
  minutesInput.value = '';
  secondsInput.value = '';
  inputArea.style.display = 'block';
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;
}

hoursInput.addEventListener('input', handleInputChange);
minutesInput.addEventListener('input', handleInputChange);
secondsInput.addEventListener('input', handleInputChange);

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
