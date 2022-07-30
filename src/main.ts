import * as moment from "moment";

const btnPlus: HTMLElement = document.getElementById("btn-Plus");
const btnMinus: HTMLElement = document.getElementById("btn-Minus");
const btnStart: HTMLElement = document.getElementById("btn-start");
const time = document.getElementById("time");
let count = 0;
time.innerText = `${count}`;
btnPlus.addEventListener("click", () => {
  count += 1;
  time.innerText = `${count}`;
});
btnMinus.addEventListener("click", () => {
  if (count > 0) {
    count -= 1;
    time.innerText = `${count}`;
  }
});
function showTime(seconds: number) {
  let min: string | number = seconds / 60;
  if (min < 10) {
    min = `0${Math.floor(seconds / 60)}`;
  } else {
    min = `${Math.floor(seconds / 60)}`;
  }
  let sec: string | number = seconds % 60;
  if (sec < 10) {
    sec = `0${Math.floor(seconds % 60)}`;
  } else {
    sec = `${Math.floor(seconds % 60)}`;
  }
  return `${min}:${sec}`;
}

function startTime() {
  const timeStop = moment().add(count * 60 + 1, "seconds");
  time.innerText = showTime(count * 60);
  btnPlus.style.visibility = "hidden";
  btnMinus.style.visibility = "hidden";
  btnStart.style.visibility = "hidden";

  const id = setInterval(() => {
    const timer = moment().diff(timeStop, "seconds") * -1;
    time.innerText = showTime(timer);

    if (timer <= 0) {
      clearInterval(id);
      time.innerText = `${0}`;
      btnPlus.style.visibility = "visible";
      btnMinus.style.visibility = "visible";
      btnStart.style.visibility = "visible";
    }
  }, 1000);
}
btnStart.addEventListener("click", () => {
  startTime();
});
