import "./styles/styles.css";

import { finalize, fromEvent, interval, takeWhile } from "rxjs";

const counter$ = interval(1000);

const feedback = document.querySelector(".feedback") as HTMLDivElement;
const timeButtons = document.querySelectorAll('.time-button') as ArrayLike<HTMLButtonElement>;
// const video = document.querySelector("#video-background") as HTMLVideoElement;
// const sound = document.querySelector("#sound-background") as HTMLAudioElement;

const timeButtonsClicks$ = fromEvent(timeButtons, 'click');

timeButtonsClicks$.subscribe((event: Event): void => {
  const selectedMinutes: string = (event.target as HTMLButtonElement).dataset.minutes ?? '';
  const selectedSeconds = Number(selectedMinutes) * 60;
  startCountdown(selectedSeconds);
});

function resetInput() {
  feedback.textContent = '00:00';
}

function printSeconds(numberOfSeconds: number, value: number) {
  if (feedback) feedback.textContent = String(numberOfSeconds - value);
}

function startCountdown(numberOfSeconds: number) {
  counter$
    .pipe(
      takeWhile((value) => value <= numberOfSeconds),
      finalize(resetInput)
    )
    .subscribe((value) => printSeconds(numberOfSeconds, value));
}
