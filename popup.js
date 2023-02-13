const currentTimeElement = document.getElementById("currentTime");
const nameElement = document.getElementById("name");
const timerElement = document.getElementById("timer");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

chrome.storage.sync.get(["name"], (result) => {
  const name = result.name ?? "Unknown";
  nameElement.textContent = `Your name is: ${name}`;
});

function updateTimeElements() {
  chrome.storage.local.get(["timer"], (res) => {
    const time = res.timer ?? 0;
    timerElement.textContent = `Timer is at: ${time}`;
  });
  const currentTime = new Date().toLocaleTimeString();
  currentTimeElement.textContent = `The time is: ${currentTime}`;
}
updateTimeElements();
setInterval(updateTimeElements, 1000);

startButton.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: true,
  });
});

stopButton.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: false,
  });
});

resetButton.addEventListener("click", () => {
  chrome.storage.local.set({
    timer: 0,
    isRunning: false,
  });
});
