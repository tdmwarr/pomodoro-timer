let timer;
let timeLeft = 1500;
let isPaused = false;
let isStudyTime = true;

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById("timer").textContent = 
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateStatusText() {
  document.getElementById("statusText").textContent = 
    `Status: ${isStudyTime ? 'Belajar' : 'Istirahat'}`;
}

function startTimer(duration) {
  clearInterval(timer);
  timeLeft = duration;
  updateDisplay();
  updateStatusText();
  isPaused = false;

  timer = setInterval(() => {
    if (!isPaused && timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else if (timeLeft === 0) {
      clearInterval(timer);
      isStudyTime = !isStudyTime;
      const nextDuration = isStudyTime 
        ? parseInt(document.getElementById("studyTime").value) * 60 
        : parseInt(document.getElementById("breakTime").value) * 60;
      startTimer(nextDuration);
    }
  }, 1000);
}

function startStudy() {
  isStudyTime = true;
  const duration = parseInt(document.getElementById("studyTime").value) * 60;
  startTimer(duration);
}

function startBreak() {
  isStudyTime = false;
  const duration = parseInt(document.getElementById("breakTime").value) * 60;
  startTimer(duration);
}

function pauseTimer() {
  isPaused = !isPaused;
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  isStudyTime = true;
  const duration = parseInt(document.getElementById("studyTime").value) * 60;
  timeLeft = duration;
  updateDisplay();
  updateStatusText();
}

updateDisplay();
updateStatusText();