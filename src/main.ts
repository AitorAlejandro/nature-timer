import { finalize, fromEvent, interval, takeWhile } from "rxjs";

const counter$ = interval(1000);

const feedback = document.querySelector(".feedback") as HTMLDivElement;
const form = document.querySelector(".form") as HTMLFormElement;
const submit$ = fromEvent<SubmitEvent>(form, "submit");

submit$.subscribe((event: SubmitEvent) => {
  event.preventDefault();
  const seconds = (event.target as HTMLFormElement).seconds.valueAsNumber;
  startCountdown(seconds);
});

function resetInput() {
  form.seconds.valueAsNumber = 0;
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
